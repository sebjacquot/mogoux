# ============================================================
#  Makefile – Webdocumentaire Mémoires Ouvrières
#  Déploiement Ubuntu / Debian (sans Docker)
#  Usage : make help
# ============================================================

# ---- Variables par défaut (surchargeables depuis l'environnement) ----
DB_USER      ?= fanum
DB_NAME      ?= mogoux
DB_PASS      ?= default_password
DB_HOST      ?= 127.0.0.1
DB_PORT      ?= 5432
SQL_FILE     ?= $(HOME)/backups/2026-03-13_export_gou-db.sql
DOCS_ARCHIVE ?= $(HOME)/backups/2026-03-13_export_documents.tar.gz
MEDIA_ARCHIVE?= $(HOME)/backups/2026-03-13_export_medias.tar.gz
APP_DIR      ?= app
#APP_SRC_DIR  ?= /var/www/mogoux/app #TODO: Seb, 2026-05-07: les src doivent être dans home/mogoux alors que l'app est dans /var/www/mogoux, modifier le script en conséquence
NODE_ENV     ?= production
PORT         ?= 3000

# Chemin absolu du répertoire courant : [Seb, 2026-05-07 : non utilisé finalement ?]
#ROOT_DIR := $(shell pwd)

# ============================================================
.PHONY: help install-node install-pg db-create db-restore \
        assets-extract assets-copy deps build start \
        full-deploy restart stop logs clean

# ============================================================
help: ## Affiche cette aide
	@echo ""
	@echo "  Webdocumentaire Mémoires Ouvrières – Makefile de déploiement"
	@echo "  ============================================================="
	@echo ""
	@awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z_-]+:.*##/ { printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)
	@echo ""
	@echo "  Déploiement complet (première installation) :"
	@echo "    make full-deploy"
	@echo ""
	@echo "  Variables configurables (ex: make db-restore DB_USER=postgres) :"
	@echo "    DB_USER=$(DB_USER)  DB_PASS=$(DB_PASS)  DB_NAME=$(DB_NAME)  DB_HOST=$(DB_HOST)  PORT=$(PORT)"
	@echo ""

# ============================================================
# 1. Dépendances système
# ============================================================
install-node: ## Installe Node.js 20.x via NodeSource
	@echo "→ Installation de Node.js 20.x..."
	curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
	sudo apt-get install -y nodejs
	node --version
	npm --version

install-pg: ## Installe la dernière version de PostgreSQL (actuellement 17 sous Debian 13 au 07-05-2026)
	@echo "→ Installation de la dernière version de PostgreSQL..."
	sudo apt-get update
	sudo apt-get install -y postgresql postgresql-client
	sudo systemctl enable postgresql
	sudo systemctl start postgresql
	@echo "✓ PostgreSQL installé et démarré"

install-deps-system: ## Installe les dépendances système nécessaires (curl, git, build-essential)
	sudo apt-get update
	sudo apt-get install -y curl git build-essential libssl-dev

# ============================================================
# 2. Base de données
# ============================================================
db-create: ## Crée l'utilisateur et la base de données PostgreSQL
	@echo "→ Création du rôle PostgreSQL '$(DB_USER)'..."
	sudo -u postgres psql -c "DO $$$$ BEGIN IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '$(DB_USER)') THEN CREATE ROLE $(DB_USER) LOGIN PASSWORD '$(DB_PASS)'; END IF; END $$$$;" 2>/dev/null || true
	@echo "→ Création de la base de données '$(DB_NAME)'..."
	sudo -u postgres psql -c "CREATE DATABASE $(DB_NAME) OWNER $(DB_USER);" 2>/dev/null || echo "  (base déjà existante, ignoré)"
	sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $(DB_NAME) TO $(DB_USER);"
	@echo "✓ Base '$(DB_NAME)' prête"

db-restore: ## Restaure la base de données depuis le dump SQL
	@if [ ! -f "$(SQL_FILE)" ]; then \
	  echo "✗ Fichier SQL introuvable : $(SQL_FILE)"; exit 1; \
	fi
	@echo "→ Restauration de la base depuis $(SQL_FILE)..."
	sudo -u postgres psql -d $(DB_NAME) -f "$(SQL_FILE)"
	@echo "✓ Base restaurée"

db-setup: db-create db-restore ## Crée et restaure la base (db-create + db-restore)

# ============================================================
# 3. Fichiers médias et documents
# ============================================================
assets-extract: ## Extrait les archives médias et documents Payload dans app/public/
	@echo "→ Extraction des médias Payload (backups → app/public/medias/)..."
	@if [ -f "$(MEDIA_ARCHIVE)" ]; then \
	  mkdir -p $(APP_DIR)/public/medias; \
	  tar -xzf "$(MEDIA_ARCHIVE)" --strip-components=4 -C "$(APP_DIR)/public/medias/"; \
	  echo "✓ Médias extraits dans $(APP_DIR)/public/medias/"; \
	else \
	  echo "  (archive médias introuvable, ignorée)"; \
	fi
	@echo "→ Extraction des documents Payload (backups → app/public/documents/)..."
	@if [ -f "$(DOCS_ARCHIVE)" ]; then \
	  mkdir -p $(APP_DIR)/public/documents; \
	  tar -xzf "$(DOCS_ARCHIVE)" --strip-components=4 -C "$(APP_DIR)/public/documents/"; \
	  echo "✓ Documents extraits dans $(APP_DIR)/public/documents/"; \
	else \
	  echo "  (archive documents introuvable, ignorée)"; \
	fi

# ============================================================
# 4. Application Next.js + Payload
# ============================================================
env-check: ## Vérifie la présence du fichier .env
	@if [ ! -f "$(APP_DIR)/.env" ]; then \
	  echo ""; \
	  echo "⚠  Fichier $(APP_DIR)/.env manquant !"; \
	  echo "   Créez-le à partir de $(APP_DIR)/.env.example :"; \
	  echo "     cp $(APP_DIR)/.env.example $(APP_DIR)/.env"; \
	  echo "   Puis renseignez les valeurs (DATABASE_URI, PAYLOAD_SECRET, etc.)"; \
	  echo ""; \
	  exit 1; \
	fi
	@echo "✓ Fichier .env présent"

deps: env-check ## Installe les dépendances npm
	@echo "→ Installation des dépendances npm..."
	cd $(APP_DIR) && npm install
	@echo "✓ Dépendances installées"

migrate: env-check ## Exécute les migrations Payload
	@echo "→ Exécution des migrations Payload..."
	cd $(APP_DIR) && npm run migrate
	@echo "✓ Migrations terminées"

build: env-check ## Compile l'application Next.js en production
	@echo "→ Build de production Next.js..."
	cd $(APP_DIR) && NODE_ENV=$(NODE_ENV) npm run build
	@echo "✓ Build terminé"

start: env-check ## Démarre le serveur Next.js en production
	@echo "→ Démarrage du serveur sur le port $(PORT)..."
	cd $(APP_DIR) && PORT=$(PORT) NODE_ENV=$(NODE_ENV) npm run start

start-bg: env-check ## Démarre le serveur en arrière-plan (avec nohup)
	@echo "→ Démarrage en arrière-plan (log: $(APP_DIR)/server.log)..."
	cd $(APP_DIR) && PORT=$(PORT) NODE_ENV=$(NODE_ENV) nohup npm run start > server.log 2>&1 & \
	  echo $$! > server.pid; \
	  echo "✓ Serveur démarré (PID $$(cat server.pid))"

stop: ## Arrête le serveur démarré avec start-bg
	@if [ -f "$(APP_DIR)/server.pid" ]; then \
	  kill $$(cat $(APP_DIR)/server.pid) && rm $(APP_DIR)/server.pid; \
	  echo "✓ Serveur arrêté"; \
	else \
	  echo "  Aucun serveur en cours (server.pid introuvable)"; \
	fi

logs: ## Affiche les logs du serveur (start-bg)
	@tail -f $(APP_DIR)/server.log

restart: stop start-bg ## Redémarre le serveur (stop + start-bg)

# ============================================================
# 5. Installation complète (première mise en production)
# ============================================================
full-deploy: ## ★ Déploiement complet depuis zéro
	@echo ""
	@echo "╔══════════════════════════════════════════════════════╗"
	@echo "║  Déploiement complet – Mémoires Ouvrières            ║"
	@echo "╚══════════════════════════════════════════════════════╝"
	@echo ""
	@$(MAKE) env-check
	@$(MAKE) assets-extract
	@$(MAKE) db-setup
	@$(MAKE) deps
	@$(MAKE) migrate
	@$(MAKE) build
	@echo ""
	@echo "╔══════════════════════════════════════════════════════╗"
	@echo "║  ✓ Déploiement terminé !                             ║"
	@echo "║  Lancez le serveur avec :  make start                ║"
	@echo "║  Ou en arrière-plan  :     make start-bg             ║"
	@echo "╚══════════════════════════════════════════════════════╝"
	@echo ""

# ============================================================
# 6. Maintenance
# ============================================================
clean-build: ## Supprime le répertoire .next (build)
	rm -rf $(APP_DIR)/.next
	@echo "✓ Build supprimé"

clean-deps: ## Supprime node_modules
	rm -rf $(APP_DIR)/node_modules
	@echo "✓ node_modules supprimé"

clean: clean-build clean-deps ## Supprime build + node_modules

update: ## Met à jour les dépendances npm et rebuild
	cd $(APP_DIR) && npm update
	@$(MAKE) build
