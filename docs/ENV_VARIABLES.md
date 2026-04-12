# Variables d'environnement

Le fichier `app/.env` (à créer depuis `app/.env.example`) configure l'application.

> **Règle absolue :** ne jamais committer le fichier `.env` dans Git. Il contient des secrets. Le `.gitignore` l'exclut déjà.

---

## Créer le fichier `.env`

```bash
cp app/.env.example app/.env
# Puis éditer app/.env avec vos valeurs
```

---

## Variables obligatoires

Ces deux variables sont **indispensables** — l'application refuse de démarrer sans elles.

### `DATABASE_URI`

URL de connexion à la base de données PostgreSQL.

```
Format : postgres://<user>:<password>@<host>:<port>/<database>
```

| Environnement | Valeur typique |
|--------------|----------------|
| Développement local | `postgres://fanum:fanum@127.0.0.1:5432/mogoux` |
| Production | `postgres://fanum:MOT_DE_PASSE_FORT@127.0.0.1:5432/mogoux` |

> Les valeurs par défaut (`fanum`/`fanum`/`mogoux`) correspondent à l'utilisateur et la base créés par le Makefile.

### `PAYLOAD_SECRET`

Clé secrète utilisée par PayloadCMS pour **signer les tokens JWT** (sessions admin).

- Doit faire **au moins 32 caractères**
- Doit être aléatoire et unique par environnement
- Si elle change en production, tous les utilisateurs sont déconnectés

```bash
# Générer une clé sécurisée :
openssl rand -base64 32
```

| Environnement | Valeur recommandée |
|--------------|-------------------|
| Développement local | N'importe quelle chaîne longue (ex : `dev-secret-local-pas-grave`) |
| Production | Chaîne générée avec `openssl rand -base64 32` |

---

## Variables optionnelles

### `NEXT_PUBLIC_SERVER_URL`

URL publique complète du serveur Next.js. Utilisée pour construire les URL des fichiers médias uploadés dans PayloadCMS.

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:3000    # développement
NEXT_PUBLIC_SERVER_URL=https://mogoux.fr        # production (sans slash final)
```

**Où est-elle utilisée dans le code :**
```typescript
const cmsBase = process.env.NEXT_PUBLIC_SERVER_URL || ''
const imageUrl = cmsBase + media.url  // → "https://mogoux.fr/medias/photo.jpg"
```

> Le préfixe `NEXT_PUBLIC_` signifie que cette variable est **embarquée dans le bundle client** au moment du build. Elle est accessible côté navigateur.

### `NEXT_PUBLIC_BASE_PATH`

Sous-répertoire dans lequel le site est déployé. Laisser vide si le site est à la racine du domaine.

```env
NEXT_PUBLIC_BASE_PATH=           # site à la racine : https://mogoux.fr/
NEXT_PUBLIC_BASE_PATH=/mogoux    # sous-répertoire : https://exemple.fr/mogoux
```

**⚠️ Important :** cette variable est lue au **moment du build** (`next build`). Si vous la modifiez, vous devez reconstruire l'application (`make build`).

**Où est-elle utilisée dans le code :**
```typescript
const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

// Pour les images statiques :
<img src={`${base}/images/Chapitre1/photo.jpg`} />

// Pour les liens internes :
<Link href={`${base}/chapitres`}>Chapitres</Link>
```

### `PORT`

Port d'écoute du serveur Next.js.

```env
PORT=3000    # défaut
PORT=8080    # si le port 3000 est occupé
```

---

## Résumé

| Variable | Obligatoire | Préfixe `NEXT_PUBLIC_` | Lue au build | Description |
|----------|-------------|----------------------|--------------|-------------|
| `DATABASE_URI` | ✅ | Non (serveur uniquement) | Non | Connexion PostgreSQL |
| `PAYLOAD_SECRET` | ✅ | Non (serveur uniquement) | Non | Secret JWT PayloadCMS |
| `NEXT_PUBLIC_SERVER_URL` | ❌ | Oui (client + serveur) | Non | URL du serveur pour les médias |
| `NEXT_PUBLIC_BASE_PATH` | ❌ | Oui (client + serveur) | **Oui** | Sous-répertoire de déploiement |
| `PORT` | ❌ | Non | Non | Port d'écoute |

---

## `.env.example` complet

```env
# ============================================================
#  .env.example – Webdocumentaire Mémoires Ouvrières
#  Copiez ce fichier en .env et renseignez les valeurs.
#  Ne commitez JAMAIS votre .env dans Git.
# ============================================================

# --- Base de données PostgreSQL ---
DATABASE_URI=postgres://fanum:fanum@127.0.0.1:5432/mogoux

# --- Secret PayloadCMS ---
# Chaîne aléatoire longue (min. 32 caractères)
# Générez-en une : openssl rand -base64 32
PAYLOAD_SECRET=CHANGEZ_MOI_secret_tres_long_et_aleatoire

# --- URL du serveur (pour les médias Payload) ---
# Développement : http://localhost:3000
# Production    : https://votre-domaine.fr (sans slash final)
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# --- Chemin de base (sous-répertoire, laisser vide si racine) ---
NEXT_PUBLIC_BASE_PATH=

# --- Port du serveur Next.js ---
PORT=3000
```
