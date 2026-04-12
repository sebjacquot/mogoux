# Dépannage — Problèmes courants

---

## Base de données

### `ECONNREFUSED` ou `connection refused` à PostgreSQL

PostgreSQL n'est pas démarré.

```bash
# Linux :
sudo systemctl status postgresql
sudo systemctl start postgresql

# macOS :
brew services list | grep postgres
brew services start postgresql@15
```

### `relation "xxx" does not exist` — tables manquantes

La restauration du dump a échoué ou n'a pas été faite. Vérifier le nombre de tables :

```bash
psql -U fanum -d mogoux -h 127.0.0.1 -c "\dt" | wc -l
# Doit afficher environ 25+ lignes (tables + entêtes)
```

Si insuffisant, relancer la restauration :
```bash
make db-restore                              # via Makefile
# ou manuellement :
psql -U fanum -d mogoux -h 127.0.0.1 -f backups/2026-03-13_export_gou-db.sql
```

### `role "fanum" does not exist`

L'utilisateur PostgreSQL n'a pas été créé.

```bash
make db-create
# ou manuellement :
sudo -u postgres psql -c "CREATE ROLE fanum LOGIN PASSWORD 'fanum';"
sudo -u postgres psql -c "CREATE DATABASE mogoux OWNER fanum;"
```

### `password authentication failed for user "fanum"`

Le mot de passe dans `DATABASE_URI` ne correspond pas à celui de PostgreSQL.

```bash
# Réinitialiser le mot de passe :
sudo -u postgres psql -c "ALTER ROLE fanum PASSWORD 'nouveau_mdp';"
# Puis mettre à jour DATABASE_URI dans app/.env
```

### `database "mogoux" does not exist`

La base n'existe pas encore.

```bash
sudo -u postgres psql -c "CREATE DATABASE mogoux OWNER fanum;"
```

---

## Application Next.js / PayloadCMS

### `Error: Cannot find module '@payload-config'`

Le fichier `payload.config.ts` n'est pas trouvé. Vérifier que `tsconfig.json` contient le path alias `@payload-config` et que le build est propre.

```bash
make clean-build
make build
```

### `Error: PAYLOAD_SECRET is not set`

La variable `PAYLOAD_SECRET` est manquante ou vide dans `app/.env`.

```bash
# Générer un secret et l'ajouter au .env :
echo "PAYLOAD_SECRET=$(openssl rand -base64 32)" >> app/.env
```

### Le site démarre mais affiche une page blanche

Vérifier les logs :

```bash
make logs          # si démarré avec make start-bg
# ou :
cd app && npm run dev   # pour voir les erreurs dans le terminal
```

Causes fréquentes :
- `app/.env` mal configuré (DATABASE_URI invalide)
- Port déjà utilisé (changer `PORT=3001` dans `.env`)
- Build corrompu → `make clean && make build`

### `Port 3000 is already in use`

```bash
# Trouver le processus qui utilise le port :
lsof -i :3000       # macOS / Linux
sudo fuser 3000/tcp # Linux

# Changer le port dans app/.env :
PORT=3001
```

### `next build` échoue avec des erreurs TypeScript

Les types Payload sont désynchronisés avec les collections. Régénérer :

```bash
cd app && npm run generate:types
# Puis réessayer :
make build
```

### Erreur `npm install` avec des conflits de dépendances

```bash
cd app && npm install --legacy-peer-deps
```

Cette option est déjà utilisée dans `Makefile.dev`. En production (Makefile), si `npm install` échoue, l'ajouter manuellement.

---

## Médias et images

### Les images Payload ne s'affichent pas

Vérifier que `NEXT_PUBLIC_SERVER_URL` dans `app/.env` ne contient **pas** de slash final :

```env
# ✅ Correct :
NEXT_PUBLIC_SERVER_URL=https://mogoux.fr

# ❌ Incorrect (slash final) :
NEXT_PUBLIC_SERVER_URL=https://mogoux.fr/
```

Vérifier également que les fichiers existent dans `app/public/medias/` :

```bash
ls app/public/medias/ | head -5
# Si vide, extraire les archives :
make assets-extract
```

### Les images statiques (`/images/...`) ne s'affichent pas

Si le site est déployé dans un sous-répertoire (`NEXT_PUBLIC_BASE_PATH=/mogoux`), vérifier que toutes les images statiques utilisent le préfixe `base` :

```typescript
const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
<img src={`${base}/images/Header_Chapitre/C1.jpg`} />  // ✅
<img src="/images/Header_Chapitre/C1.jpg" />           // ❌ (manque basePath)
```

### La route `/img/[id]` retourne 404

L'ID passé ne correspond à aucun média dans la collection `medias` de Payload. Vérifier l'ID dans l'interface admin ou via l'API :

```bash
curl http://localhost:3000/api/medias/42
# Doit retourner les métadonnées du média, sinon l'ID est invalide
```

### L'audio ne permet pas de seek sur Chrome

Le header `Accept-Ranges: bytes` doit être présent dans la réponse. Vérifier la collection `Documents.ts` :
```typescript
modifyResponseHeaders: ({ headers }) => {
  const newHeaders = new Headers(headers)
  newHeaders.set('Accept-Ranges', 'bytes')
  return newHeaders
}
```

---

## Interface admin PayloadCMS

### Impossible de se connecter à `/admin`

- Vérifier que le serveur est démarré et accessible
- Vérifier que `PAYLOAD_SECRET` est identique entre les démarrages (si le secret change, les sessions sont invalidées)
- Si c'est la première connexion avec une base restaurée, les comptes du dump sont présents — utiliser les identifiants fournis

### `CSRF token mismatch`

L'URL dans `NEXT_PUBLIC_SERVER_URL` ne correspond pas à l'URL depuis laquelle vous accédez à l'admin. Vérifier que `payload.config.ts` autorise bien l'origine :

```typescript
csrf: [serverURL],
cors: [serverURL],
```

Et que `serverURL` dans `payload.config.ts` correspond à `NEXT_PUBLIC_SERVER_URL` dans `.env`.

### L'import de documents échoue

- Vérifier que le fichier CSV/Excel respecte le format du modèle (téléchargeable depuis l'admin)
- Les champs obligatoires manquants (cote, titre, date, type, alt, crédit) causent des erreurs ligne par ligne
- Vérifier les logs du serveur pour voir les erreurs détaillées

---

## Déploiement

### `make full-deploy` échoue à mi-parcours

Vérifier quelle étape a échoué dans le log, puis relancer uniquement cette étape :

```bash
make env-check          # si .env manquant
make db-setup           # si problème base de données
make assets-extract     # si archives introuvables
make deps               # si npm install échoue
make migrate            # si migrations échouent
make build              # si build échoue
```

### `NEXT_PUBLIC_BASE_PATH` ne semble pas pris en compte

Cette variable est intégrée **au moment du build**. Si vous la modifiez après le build, vous devez reconstruire :

```bash
make clean-build
make build
make restart
```

### Le serveur ne redémarre pas après un reboot (systemd)

```bash
sudo systemctl status mogoux
sudo journalctl -u mogoux -n 50    # voir les erreurs de démarrage
sudo systemctl enable mogoux       # s'assurer que le service est activé
```

---

## Performances

### Le site est lent au premier chargement

Vérifier que `NODE_ENV=production` est bien défini dans `.env` ou dans la commande de démarrage. En mode `development`, Next.js compile à la volée, ce qui est très lent.

### Les pages `/documents/[slug]` ne se mettent pas à jour

Si le contenu modifié dans l'admin n'apparaît pas sur le site, vérifier que la page est bien marquée `force-dynamic` :

```typescript
// En haut de la page :
export const dynamic = 'force-dynamic'
```

Sans cette directive, Next.js peut mettre la page en cache statique au build.
