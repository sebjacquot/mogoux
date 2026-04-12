# Makefiles — Automatisation

Le projet dispose de deux Makefiles avec des objectifs distincts.

---

## `Makefile` — Déploiement en production

Destiné à un **serveur Linux Ubuntu/Debian**. Automatise le déploiement complet de A à Z.

### Commande principale

```bash
make full-deploy
```

Cette commande fait tout dans l'ordre : vérification du `.env` → extraction des archives → création de la base de données → restauration du dump → installation npm → migrations Payload → build Next.js.

### Toutes les cibles disponibles

```bash
make help                  # Affiche la liste des cibles disponibles

# Dépendances système
make install-deps-system   # Installe curl, git, build-essential
make install-node          # Installe Node.js 20.x via NodeSource (apt)
make install-pg            # Installe PostgreSQL 15 via apt

# Base de données
make db-create             # Crée le rôle et la base de données PostgreSQL
make db-restore            # Restaure le dump SQL
make db-setup              # db-create + db-restore en une commande

# Médias et documents
make assets-extract        # Extrait les archives .tar.gz dans public/

# Application
make env-check             # Vérifie que app/.env existe (sinon erreur)
make deps                  # npm install
make migrate               # Exécute les migrations Payload
make build                 # next build (mode production)

# Serveur
make start                 # Démarre au premier plan (bloquant)
make start-bg              # Démarre en arrière-plan avec nohup
make stop                  # Arrête le serveur en arrière-plan
make restart               # stop + start-bg
make logs                  # Affiche les logs en temps réel (tail -f)

# Maintenance
make clean-build           # Supprime le dossier .next
make clean-deps            # Supprime node_modules
make clean                 # clean-build + clean-deps
make update                # npm update + rebuild

# Tout en un
make full-deploy           # ★ Déploiement complet depuis zéro
```

### Variables configurables

Toutes les variables ont des valeurs par défaut mais peuvent être surchargées :

```bash
make full-deploy DB_USER=postgres DB_NAME=ma_base PORT=8080
make db-restore SQL_FILE=backups/mon_dump.sql
```

| Variable | Défaut | Description |
|----------|--------|-------------|
| `DB_USER` | `fanum` | Utilisateur PostgreSQL |
| `DB_NAME` | `mogoux` | Nom de la base de données |
| `DB_HOST` | `127.0.0.1` | Hôte PostgreSQL |
| `DB_PORT` | `5432` | Port PostgreSQL |
| `SQL_FILE` | `backups/2026-03-13_export_gou-db.sql` | Fichier dump SQL |
| `DOCS_ARCHIVE` | `backups/2026-03-13_export_documents.tar.gz` | Archive documents |
| `MEDIA_ARCHIVE` | `backups/2026-03-13_export_medias.tar.gz` | Archive médias |
| `APP_DIR` | `app` | Répertoire de l'application |
| `NODE_ENV` | `production` | Environnement Node.js |
| `PORT` | `3000` | Port du serveur Next.js |

### Gestion du serveur en production

Le `Makefile` utilise `nohup` pour démarrer le serveur en arrière-plan :
- Les logs sont écrits dans `app/server.log`
- Le PID du processus est stocké dans `app/server.pid`
- `make stop` lit ce PID pour terminer le processus proprement

```bash
make start-bg    # démarre (crée server.pid et server.log)
make logs        # surveille les logs en temps réel
make stop        # arrête le serveur
make restart     # stop + start-bg
```

---

## `Makefile.dev` — Développement local

Destiné au **poste du développeur**. Fonctionne sur macOS (Homebrew) et Linux (apt).

### Commandes principales

```bash
make -f Makefile.dev           # Setup complet + lance le serveur de dev (tout en un)
make -f Makefile.dev setup     # Installation complète (une seule fois)
make -f Makefile.dev dev       # Lance uniquement le serveur de développement
make -f Makefile.dev reset     # Repart de zéro (supprime DB + node_modules + .next)
```

### Toutes les cibles disponibles

```bash
make -f Makefile.dev help          # Affiche l'aide

# Node.js
make -f Makefile.dev check-node    # Vérifie Node.js ≥ 20, installe si absent
make -f Makefile.dev install-node  # Installe Node.js 20

# PostgreSQL
make -f Makefile.dev check-pg      # Vérifie PostgreSQL, installe si absent
make -f Makefile.dev pg-start      # S'assure que PostgreSQL est démarré

# Base de données
make -f Makefile.dev db-create     # Crée le rôle et la base locale
make -f Makefile.dev db-restore    # Restaure le dump SQL

# Médias
make -f Makefile.dev media-extract # Extrait les archives dans public/

# Environnement
make -f Makefile.dev env-setup     # Crée app/.env depuis .env.example (si absent)

# Dépendances
make -f Makefile.dev deps          # npm install (si node_modules absent)

# Serveur de dev
make -f Makefile.dev dev           # Lance npm run dev (hot-reload)

# Remise à zéro
make -f Makefile.dev clean-deps    # Supprime node_modules + .next
make -f Makefile.dev clean-db      # Supprime la base de données locale
make -f Makefile.dev reset         # clean-deps + clean-db
```

### Détection automatique de l'OS

Le `Makefile.dev` détecte automatiquement le système d'exploitation avec `uname -s` et adapte ses commandes :

| Action | macOS (`Darwin`) | Linux |
|--------|-----------------|-------|
| Installer Node.js | `brew install node@20` | `apt-get install nodejs` |
| Installer PostgreSQL | `brew install postgresql@15` | `apt-get install postgresql` |
| Démarrer PostgreSQL | `brew services start postgresql@15` | `sudo systemctl start postgresql` |
| Connexion superuser | `psql -U $(whoami)` | `sudo -u postgres psql` |

### Comportements intelligents (évite les re-installations)

Le `Makefile.dev` vérifie l'existence des ressources avant d'agir :

- **Node.js déjà installé ?** → vérifie la version, n'installe que si trop ancien
- **PostgreSQL déjà installé ?** → le démarre juste, ne réinstalle pas
- **`node_modules` déjà présent ?** → affiche un message, ne relance pas `npm install`
- **`app/.env` déjà présent ?** → ne l'écrase pas
- **`public/medias/` déjà rempli ?** → ne réextrait pas les archives

### Création automatique du `.env`

Contrairement au `Makefile` (prod) qui exige que `.env` soit créé manuellement, le `Makefile.dev` **crée automatiquement** `app/.env` depuis `app/.env.example` et **pré-remplit** les valeurs locales :

```env
DATABASE_URI=postgres://fanum:fanum@127.0.0.1:5432/mogoux
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
PORT=3000
```

> **Important :** `PAYLOAD_SECRET` n'est pas auto-rempli car il doit rester une valeur choisie par le développeur. En local, n'importe quelle chaîne fonctionne.

---

## Tableau comparatif

| Aspect | `Makefile` | `Makefile.dev` |
|--------|-----------|----------------|
| **Usage** | Serveur de production | Poste développeur |
| **OS supportés** | Ubuntu/Debian uniquement | macOS + Linux |
| **Invocation** | `make <cible>` | `make -f Makefile.dev <cible>` |
| **Mode serveur** | Production (`next build` + `next start`) | Développement (`next dev`, hot-reload) |
| **Installation packages** | `sudo apt-get` | `brew` (macOS) ou `apt` (Linux) |
| **Détection OS** | Non | Oui (`uname -s`) |
| **Vérifications d'existence** | Non | Oui (Node, PG, node_modules, médias, .env) |
| **Création automatique `.env`** | Non (manuel obligatoire) | Oui (auto depuis `.env.example`) |
| **Démarrage en arrière-plan** | Oui (`nohup`, `server.pid`) | Non (process bloquant) |
| **Couleurs dans le terminal** | Non | Oui (vert, jaune, cyan) |
| **Commande tout-en-un** | `make full-deploy` | `make -f Makefile.dev` |
| **Remise à zéro** | `make clean` (build + deps) | `make -f Makefile.dev reset` (build + deps + DB) |
