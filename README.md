# Documentation – Webdocumentaire « Des mémoires ouvrières aux *Mémoires de l'Enclave* »

## Sommaire

1. [Vue d'ensemble](#1-vue-densemble)
2. [Architecture](#2-architecture)
3. [Structure des fichiers](#3-structure-des-fichiers)
4. [Composants](#4-composants)
5. [PayloadCMS](#5-payloadcms)
6. [Variables d'environnement](#6-variables-denvironnement)
7. [Déploiement Ubuntu/Debian](#7-déploiement-ubuntudebian)
8. [Développement local](#8-développement-local)
9. [Makefile – référence complète](#9-makefile--référence-complète)
10. [Conventions et bonnes pratiques](#10-conventions-et-bonnes-pratiques)

---

## 1. Vue d'ensemble

Ce projet est un **webdocumentaire** qui présente les archives sonores et photographiques liées à la résidence de l'écrivain Jean-Paul Goux à Montbéliard (1984-1986) et à son œuvre *Mémoires de l'Enclave* (1986, rééd. 2003).

### Stack technique

| Couche | Technologie |
|--------|-------------|
| Framework frontend | Next.js 15 (App Router) |
| CMS headless | PayloadCMS 3.x |
| Base de données | PostgreSQL 15 |
| Styles | TailwindCSS 3 |
| Langage | TypeScript |
| Runtime | Node.js ≥ 20 |

### Choix d'unification

Le projet combine **Next.js et PayloadCMS dans un seul serveur** : il n'y a plus deux processus à gérer. PayloadCMS est monté sous le chemin `/admin` (interface d'administration) et `/api` (routes API), tandis que toutes les pages publiques vivent sous `/(site)`. Les deux partagent la même instance Node.js et le même port.

---

## 2. Architecture

```
Requête HTTP
     │
     ▼
  Next.js 15
  ┌──────────────────────────────────────────────┐
  │  Route group (payload)                       │
  │   /admin  →  Interface d'administration CMS  │
  │   /api    →  API REST + GraphQL Payload       │
  │                                              │
  │  Route group (site)                          │
  │   /              Page d'accueil              │
  │   /chapitres     Listing des 9 chapitres     │
  │   /chapitres/[N] Pages de chapitres          │
  │   /carte         Carte interactive           │
  │   /documentaire  Documentaire vidéo          │
  │   /documents/[slug]  Détail d'un document    │
  │   /lieux-reference/[slug]  Lieu de référence │
  │   /navigation    Page de navigation          │
  │   /thematiques   Listing des thématiques     │
  │   /thematiques/[slug]  Détail thématique     │
  │   /annexe/*      Pages statiques             │
  └──────────────────────────────────────────────┘
     │
     ▼
  PostgreSQL (via @payloadcms/db-postgres)
```

### Accès aux données

Les pages serveur accèdent directement à la base de données via le SDK Payload (`getPayload()`), **sans faire de requêtes HTTP**. Cela élimine la latence réseau entre frontend et CMS.

```typescript
// src/utils/payload.ts
import { getPayload as _getPayload } from 'payload'
import config from '@payload-config'

let cached: any = null
export async function getPayload() {
  if (!cached) cached = await _getPayload({ config })
  return cached
}
```

---

## 3. Structure des fichiers

```
app/
├── .env.example           # Modèle de configuration (à copier en .env)
├── next.config.mjs        # Config Next.js (basePath, images, withPayload)
├── tailwind.config.ts     # Thème TailwindCSS (couleurs, polices)
├── public/                # Assets statiques servis directement
│   ├── images/            # Toutes les images (chapitres, header, carte…)
│   ├── icones/            # Icônes SVG/PNG
│   └── favicon.svg
└── src/
    ├── app/
    │   ├── globals.css    # Classes utilitaires (@layer components)
    │   ├── layout.tsx     # Layout racine (métadonnées globales)
    │   ├── (payload)/     # Routes réservées à PayloadCMS
    │   │   ├── admin/     # Interface d'administration
    │   │   └── api/       # API REST et GraphQL
    │   └── (site)/        # Toutes les pages publiques
    │       ├── layout.tsx # Layout du site (Header + Footer)
    │       ├── page.tsx   # Page d'accueil
    │       ├── chapitres/
    │       ├── carte/
    │       ├── documentaire/
    │       ├── documents/[slug]/
    │       ├── lieux-reference/[slug]/
    │       ├── navigation/
    │       ├── thematiques/
    │       └── annexe/
    ├── collections/       # Définitions des collections Payload
    │   ├── Documents.ts
    │   ├── Sections.ts
    │   ├── Thematics.ts
    │   ├── ReferenceLocations.ts
    │   ├── Medias.ts
    │   └── …
    ├── components/        # Composants React partagés
    │   ├── Header.tsx
    │   ├── Footer.tsx
    │   ├── ImageTooltip.tsx
    │   ├── ImageFullscreen.tsx
    │   ├── CarteMap.tsx         # 'use client' – carte interactive
    │   ├── DocumentairePlayer.tsx # 'use client' – lecteur vidéo
    │   ├── LieuReferencePage.tsx  # 'use client' – toggle desc/citation
    │   ├── Carousel.tsx
    │   ├── Gallery.tsx
    │   ├── Audio.tsx
    │   ├── Video.tsx
    │   ├── Details.tsx
    │   ├── Sections.tsx
    │   ├── Return.tsx
    │   └── SuggestionsCard.tsx
    └── utils/
        ├── payload.ts     # Singleton getPayload() mis en cache
        └── renderLexical.ts # Convertisseur Lexical JSON → HTML
```

---

## 4. Composants

### Composants serveur (Server Components)

Les pages sous `(site)/` sont des **Server Components** par défaut. Elles appellent `getPayload()` et récupèrent les données directement depuis PostgreSQL au moment du rendu. Aucun état côté client, aucun JavaScript envoyé au navigateur (sauf les composants client imbriqués).

### Composants client ('use client')

Certains composants nécessitent de l'interactivité et sont marqués `'use client'` :

| Composant | Rôle |
|-----------|------|
| `Header.tsx` | Menu mobile (burger), état ouvert/fermé |
| `CarteMap.tsx` | Carte interactive avec zoom au survol et pins cliquables |
| `DocumentairePlayer.tsx` | Lecteur vidéo avec chapitrage (seek vers timestamps) |
| `LieuReferencePage.tsx` | Toggle entre description et citation (slide CSS) |
| `Carousel.tsx` | Carrousel d'images avec navigation |
| `Gallery.tsx` | Grille de photos avec lightbox |
| `Audio.tsx` | Lecteur audio HTML5 personnalisé |
| `ImageFullscreen.tsx` | Image avec mode plein écran |
| `ImageTooltip.tsx` | Image avec légende au survol |

### Classes CSS partagées (globals.css)

Toutes les pages partagent des classes définies dans `@layer components` :

| Classe | Usage |
|--------|-------|
| `.chapter-entete` | Section hero d'un chapitre (image de fond plein écran) |
| `.chapter-overlay` | Calque sombre semi-transparent sur le hero |
| `.chapter-hero` | Conteneur centré du titre dans le hero |
| `.chapter-tag` | Badge rouge au-dessus du titre (`CHAPITRE X`) |
| `.chapter-titre` | Titre H1 blanc du chapitre |
| `.chapter-soustitre` | Sous-titre H2 blanc du chapitre |
| `.article-content` | Wrapper principal du contenu (max-width, centré) |
| `.article-section-title` | Titre H2 d'une section d'article |
| `.article-paragraph` | Paragraphe avec marges standards |
| `.article-image` | Image dans le corps de l'article |
| `.credits-section` | Section crédits en bas de page |
| `.credits-inner` | Contenu des crédits (centré, police plus petite) |
| `.suggestions-tag` | Titre « Suggestions » |
| `.suggestions-section` | Grille des suggestions (3 cartes) |

---

## 5. PayloadCMS

### Collections disponibles

| Collection (slug) | Description |
|-------------------|-------------|
| `documents` | Documents d'archive (images, audio, vidéo) avec métadonnées |
| `sections` | Sections d'un chapitre (texte Lexical + médias associés) |
| `thematics` | Thématiques transversales |
| `reference-locations` | Lieux de référence géographiques |
| `metadata-files` | Fichiers de métadonnées |
| `medias` | Médias uploadés (photos, vidéos, audio) |
| `users` | Utilisateurs de l'interface d'administration |
| `colors` | Palettes de couleurs des thématiques |
| `document-types` | Types de documents |
| `material-types-and-formats` | Types et formats de matériaux |

### Accès à l'interface d'administration

L'interface PayloadCMS est accessible à l'URL : `http://[votre-domaine]/admin`

Créez le premier compte administrateur lors de la première connexion.

### Rich Text Lexical

Les contenus riches (descriptions, introductions) sont stockés au format JSON Lexical par PayloadCMS. La fonction `renderLexicalToHTML()` dans `src/utils/renderLexical.ts` convertit ce JSON en HTML pour l'affichage.

```typescript
import { renderLexicalToHTML } from '@/utils/renderLexical'

const html = renderLexicalToHTML(doc.description) // doc.description est un objet Lexical JSON
```

### Construction des URL de médias

Les médias uploadés dans PayloadCMS sont servis par Next.js. Leur URL est construite ainsi :

```typescript
const cmsBase = process.env.NEXT_PUBLIC_SERVER_URL || ''
const imageUrl = cmsBase + media.url  // ex: http://localhost:3000/api/media/file/photo.jpg
```

---

## 6. Variables d'environnement

Créez un fichier `.env` dans le dossier `app/` à partir de `.env.example` :

```bash
cp app/.env.example app/.env
```

### Variables obligatoires

| Variable | Description | Exemple |
|----------|-------------|---------|
| `DATABASE_URI` | URL de connexion PostgreSQL | `postgres://fanum:db_password@127.0.0.1:5432/mogoux` |
| `PAYLOAD_SECRET` | Secret JWT pour PayloadCMS (min. 32 chars) | `openssl rand -base64 32` |

### Variables optionnelles

| Variable | Description | Défaut |
|----------|-------------|--------|
| `NEXT_PUBLIC_SERVER_URL` | URL publique du serveur (pour les médias) | `http://localhost:3000` |
| `NEXT_PUBLIC_BASE_PATH` | Sous-répertoire de déploiement | `` (racine) |
| `PORT` | Port d'écoute du serveur | `3000` |
| `NODE_ENV` | Environnement (`production` / `development`) | `production` |

### Déploiement dans un sous-répertoire

Si le site est accessible à `https://example.com/mogoux` :

```env
NEXT_PUBLIC_BASE_PATH=/mogoux
NEXT_PUBLIC_SERVER_URL=https://example.com
```

**Important :** `NEXT_PUBLIC_BASE_PATH` est lu au moment du **build** (`next build`). Si vous le changez, vous devez reconstruire l'application.

---

## 7. Déploiement Ubuntu/Debian

### Prérequis système

```bash
# Mettre à jour le système
sudo apt-get update && sudo apt-get upgrade -y

# Installer les outils de base
sudo apt-get install -y curl git build-essential

# Installer Node.js 20.x
make install-node

# Installer PostgreSQL 15
make install-pg
```

### Déploiement complet (première installation)

```bash
# 1. Cloner le dépôt
git clone <url-du-depot> /var/www/mogoux
cd /var/www/mogoux

# 2. Créer et configurer le fichier .env
cp app/.env.example app/.env
nano app/.env
# → Renseignez DATABASE_URI et PAYLOAD_SECRET

# 3. Stocker le mot de passe de l'utilisateur PostgreSQL qui va être créé
export DB_PASS='db_password'

# 4. Lancer le déploiement complet
make full-deploy
```

La commande `make full-deploy` effectue dans l'ordre :

1. Vérification du fichier `.env`
2. Copie des assets statiques (`web/public/` → `app/public/`)
3. Extraction des archives médias
4. Création de la base de données PostgreSQL
5. Restauration du dump SQL
6. Installation des dépendances npm
7. Exécution des migrations Payload
8. Build de production Next.js

```bash
# 5. Démarrer le serveur
make start          # en premier plan
# ou
make start-bg       # en arrière-plan (recommandé en production)
```

### Gestion du serveur

```bash
make start-bg    # Démarrer en arrière-plan
make stop        # Arrêter
make restart     # Redémarrer
make logs        # Suivre les logs (tail -f)
```

### Mise à jour

```bash
git pull
make build       # Reconstruire après une mise à jour du code
make restart     # Redémarrer le serveur
```

### Reverse proxy Nginx (recommandé)

Pour exposer le site sur le port 80/443, configurez Nginx :

```nginx
# /etc/nginx/sites-available/mogoux
server {
    listen 80;
    server_name votre-domaine.fr;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/mogoux /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### Systemd (service automatique au démarrage)

```ini
# /etc/systemd/system/mogoux.service
[Unit]
Description=Webdocumentaire Mémoires Ouvrières
After=network.target postgresql.service

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/mogoux/app
ExecStart=/usr/bin/node_modules/.bin/next start
Restart=on-failure
Environment=NODE_ENV=production
EnvironmentFile=/var/www/mogoux/app/.env

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable mogoux
sudo systemctl start mogoux
sudo systemctl status mogoux
```

---

## 8. Développement local

```bash
cd app

# Installer les dépendances
npm install

# Copier et configurer l'environnement
cp .env.example .env
# Éditer .env avec votre configuration locale

# Lancer en mode développement (hot-reload)
npm run dev
```

Le serveur de développement sera accessible sur `http://localhost:3000`.

### Commandes utiles

```bash
npm run dev              # Serveur de développement
npm run build            # Build de production
npm run start            # Serveur de production
npm run migrate          # Exécuter les migrations Payload
npm run migrate:create   # Créer une nouvelle migration
npm run generate:types   # Régénérer les types TypeScript depuis les collections
npm run payload          # CLI Payload (autres commandes)
```

---

## 9. Makefile – référence complète

| Cible | Description |
|-------|-------------|
| `make help` | Affiche l'aide |
| `make full-deploy` | **Déploiement complet depuis zéro** |
| `make install-node` | Installe Node.js 20.x |
| `make install-pg` | Installe PostgreSQL 15 |
| `make db-create` | Crée le rôle et la base de données |
| `make db-restore` | Restaure depuis le dump SQL |
| `make db-setup` | db-create + db-restore |
| `make assets-copy` | Copie web/public/ → app/public/ |
| `make assets-extract` | Extrait les archives .tar.gz |
| `make deps` | Installe les dépendances npm |
| `make migrate` | Exécute les migrations Payload |
| `make build` | Build de production Next.js |
| `make start` | Démarre le serveur (premier plan) |
| `make start-bg` | Démarre en arrière-plan (nohup) |
| `make stop` | Arrête le serveur arrière-plan |
| `make restart` | Redémarre le serveur |
| `make logs` | Suit les logs du serveur |
| `make clean` | Supprime .next + node_modules |
| `make update` | Met à jour les dépendances + rebuild |

### Surcharge des variables

```bash
make db-restore DB_NAME=ma_base DB_USER=mon_user SQL_FILE=mon_dump.sql
make start PORT=8080
make full-deploy DB_NAME=mogoux DB_USER=fanum PORT=3000
```

---

## 10. Conventions et bonnes pratiques

### Composants serveur vs client

- **Toujours commencer par un Server Component** : s'il n'a pas besoin d'interactivité, laissez-le serveur.
- Ajoutez `'use client'` uniquement si le composant utilise `useState`, `useEffect`, `useRef`, des événements DOM, ou des APIs navigateur.
- Passez les données du serveur au client via les props (jamais via fetch côté client si les données viennent de Payload).

### Chemins d'images statiques

Toutes les images statiques utilisent `NEXT_PUBLIC_BASE_PATH` :

```typescript
const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
// ...
<img src={`${base}/images/Header_Chapitre/C1_image.jpg`} />
```

### Chemins des médias Payload

Les médias uploadés dans PayloadCMS utilisent `NEXT_PUBLIC_SERVER_URL` :

```typescript
const cmsBase = process.env.NEXT_PUBLIC_SERVER_URL || ''
const url = cmsBase + media.url
```

### Rendu Lexical

Toujours utiliser `renderLexicalToHTML()` pour afficher des contenus riches de Payload, et `dangerouslySetInnerHTML` avec le résultat. Le HTML généré est produit côté serveur, il n'y a pas de risque XSS dans ce contexte.

### Export dynamique

Les pages qui font des requêtes Payload doivent désactiver le cache statique :

```typescript
export const dynamic = 'force-dynamic'
```

Cela est nécessaire pour les pages avec des données qui changent souvent (`documents/[slug]`, `lieux-reference/[slug]`, etc.).
