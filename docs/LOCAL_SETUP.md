# Lancement en local – Guide étape par étape

Ce guide explique comment faire tourner le projet **entièrement en local** sur votre machine (Mac, Linux, Windows/WSL), avec la base de données PostgreSQL locale et toutes les données Payload récupérées depuis les archives.

---

## Prérequis

| Outil | Version minimale | Vérification |
|-------|-----------------|--------------|
| Node.js | ≥ 20 | `node --version` |
| npm | ≥ 10 | `npm --version` |
| PostgreSQL | ≥ 14 | `psql --version` |

### Installer PostgreSQL si absent

**macOS (Homebrew) :**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Ubuntu / Debian :**
```bash
sudo apt-get install -y postgresql postgresql-client
sudo systemctl start postgresql
```

**Windows :** Utilisez [WSL2](https://learn.microsoft.com/fr-fr/windows/wsl/) avec Ubuntu, puis la commande ci-dessus.

---

## Étape 1 — Créer la base de données locale

```bash
# Se connecter en tant que superutilisateur PostgreSQL
sudo -u postgres psql        # Linux
psql -U postgres             # macOS / Windows

# Dans le shell psql, exécuter :
CREATE ROLE fanum LOGIN PASSWORD 'fanum';
CREATE DATABASE mogoux OWNER fanum;
GRANT ALL PRIVILEGES ON DATABASE mogoux TO fanum;
\q
```

---

## Étape 2 — Restaurer les données depuis le dump SQL

```bash
# Depuis la racine du projet (dossier mogoux/)
psql -U fanum -d mogoux -h 127.0.0.1 -f backups/2026-03-13_export_gou-db.sql
```

> **Note :** La première ligne du dump (`\restrict ...`) génère un avertissement "unrecognized command" — c'est normal, ignorez-le. La restauration se poursuit normalement.

Vous pouvez vérifier que les tables sont bien là :

```bash
psql -U fanum -d mogoux -h 127.0.0.1 -c "\dt"
```

---

## Étape 3 — Extraire les fichiers médias Payload

Les archives contiennent les fichiers uploadés dans PayloadCMS (images, audio, vidéos). Ils doivent aller dans `app/public/medias/` et `app/public/documents/`.

```bash
# Depuis la racine du projet (dossier mogoux/)

# Médias (images/vidéos/audio des thématiques et lieux de référence)
mkdir -p app/public/medias
tar -xzf backups/2026-03-13_export_medias.tar.gz \
    --strip-components=4 \
    -C app/public/medias/

# Documents (archives numérisées)
mkdir -p app/public/documents
tar -xzf backups/2026-03-13_export_documents.tar.gz \
    --strip-components=4 \
    -C app/public/documents/
```

> **Pourquoi `--strip-components=4` ?** Les archives contiennent des chemins du type `var/www/mogoux/cms/medias/fichier.jpg`. On supprime les 4 premiers niveaux de dossier (`var/www/mogoux/cms/`) pour placer les fichiers directement dans la destination.

---

## Étape 4 — Configurer l'environnement

```bash
cd app/
cp .env.example .env
```

Éditez `app/.env` :

```env
DATABASE_URI=postgres://fanum:fanum@127.0.0.1:5432/mogoux
PAYLOAD_SECRET=un-secret-quelconque-pour-le-dev-local
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
NEXT_PUBLIC_BASE_PATH=
PORT=3000
```

> **`PAYLOAD_SECRET`** : en local, n'importe quelle chaîne fait l'affaire. En production, générez-en une forte avec `openssl rand -base64 32`.

---

## Étape 5 — Installer les dépendances

```bash
cd app/
npm install
```

---

## Étape 6 — Lancer en mode développement

```bash
cd app/
npm run dev
```

Le site est accessible sur **http://localhost:3000**

L'interface d'administration Payload est accessible sur **http://localhost:3000/admin**

> **Première connexion à `/admin` :** Payload vous demandera de créer un compte administrateur (email + mot de passe). Ce compte est stocké dans votre base locale.

---

## Récapitulatif des commandes (tout d'un coup)

```bash
# Depuis la racine du projet
sudo -u postgres psql -c "CREATE ROLE fanum LOGIN PASSWORD 'fanum';"
sudo -u postgres psql -c "CREATE DATABASE mogoux OWNER fanum;"
psql -U fanum -d mogoux -h 127.0.0.1 -f backups/2026-03-13_export_gou-db.sql

mkdir -p app/public/medias app/public/documents
tar -xzf backups/2026-03-13_export_medias.tar.gz    --strip-components=4 -C app/public/medias/
tar -xzf backups/2026-03-13_export_documents.tar.gz --strip-components=4 -C app/public/documents/

cp app/.env.example app/.env
# → éditer app/.env si besoin

cd app && npm install && npm run dev
```

---

## Structure finale du projet

```
mogoux/
├── app/                        ← L'application (Next.js 15 + PayloadCMS)
│   ├── .env                    ← Votre config locale (créé à l'étape 4)
│   ├── .env.example            ← Modèle de config
│   ├── public/
│   │   ├── images/             ← Assets statiques (logos, chapitres, carte…)
│   │   ├── icones/
│   │   ├── medias/             ← Fichiers uploadés dans Payload (images thématiques)
│   │   └── documents/          ← Documents numérisés (images, audio, vidéo)
│   └── src/
│       ├── app/
│       │   ├── (payload)/      ← Routes admin + API Payload
│       │   └── (site)/         ← Toutes les pages publiques
│       ├── collections/        ← Définitions des collections Payload
│       ├── components/         ← Composants React
│       └── utils/
├── backups/                    ← Archives originales (dump SQL + médias)
│   ├── 2026-03-13_export_gou-db.sql
│   ├── 2026-03-13_export_documents.tar.gz
│   └── 2026-03-13_export_medias.tar.gz
├── Makefile                    ← Automatisation du déploiement
├── DOCUMENTATION.md            ← Documentation complète de l'architecture
└── LOCAL_SETUP.md              ← Ce fichier
```

---

## Dépannage

**`ECONNREFUSED` ou `connection refused` à PostgreSQL :**
```bash
# Vérifier que PostgreSQL tourne
sudo systemctl status postgresql    # Linux
brew services list | grep postgres  # macOS

# Démarrer si arrêté
sudo systemctl start postgresql     # Linux
brew services start postgresql@15  # macOS
```

**`relation "users" does not exist` ou erreurs de tables manquantes :**
La restauration du dump a peut-être échoué. Vérifiez avec :
```bash
psql -U fanum -d mogoux -h 127.0.0.1 -c "\dt" | wc -l
# Doit afficher ~20+ tables
```

**Les images/médias Payload ne s'affichent pas :**
Vérifiez que `NEXT_PUBLIC_SERVER_URL` dans `.env` vaut exactement `http://localhost:3000` (sans slash final).

**Port 3000 déjà utilisé :**
Changez le port dans `.env` : `PORT=3001`, puis accédez à `http://localhost:3001`.
