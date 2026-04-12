# Déploiement en production — Ubuntu/Debian

Ce guide couvre le déploiement complet sur un serveur Linux Ubuntu/Debian (VPS, serveur dédié, etc.).

---

## Prérequis

- Serveur Ubuntu 22.04 ou Debian 12 minimum
- Accès SSH avec `sudo`
- Nom de domaine pointant vers le serveur (pour HTTPS)
- Le dépôt Git accessible depuis le serveur

---

## 1. Cloner le dépôt

```bash
sudo mkdir -p /var/www
sudo chown $USER:$USER /var/www
git clone <url-du-depot> /var/www/mogoux
cd /var/www/mogoux
```

---

## 2. Installer les dépendances système

```bash
# Outils de base
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install -y curl git build-essential libssl-dev

# Node.js 20.x
make install-node

# PostgreSQL 15
make install-pg
```

Vérification :
```bash
node --version    # doit afficher v20.x.x
psql --version    # doit afficher PostgreSQL 15.x
```

---

## 3. Configurer la base de données

```bash
make db-create
```

Cette commande crée automatiquement :
- L'utilisateur PostgreSQL `fanum` (si absent)
- La base de données `mogoux` appartenant à `fanum`

> Pour utiliser un autre utilisateur ou nom de base : `make db-create DB_USER=monuser DB_NAME=mabase`

---

## 4. Créer le fichier `.env`

```bash
cp app/.env.example app/.env
nano app/.env
```

Renseigner **au minimum** :

```env
DATABASE_URI=postgres://fanum:MOT_DE_PASSE@127.0.0.1:5432/mogoux
PAYLOAD_SECRET=CHAINE_ALEATOIRE_32_CHARS_MINIMUM
NEXT_PUBLIC_SERVER_URL=https://votre-domaine.fr
NEXT_PUBLIC_BASE_PATH=
PORT=3000
```

Générer un secret fort :
```bash
openssl rand -base64 32
```

---

## 5. Déploiement complet

```bash
make full-deploy
```

Cette commande effectue dans l'ordre :
1. Vérification du `.env`
2. Extraction des archives médias (`backups/*.tar.gz` → `app/public/`)
3. Restauration du dump SQL (`backups/*.sql` → PostgreSQL)
4. `npm install`
5. Migrations Payload (`npm run migrate`)
6. Build de production (`next build`)

Durée approximative : 5 à 15 minutes selon la machine.

---

## 6. Démarrer le serveur

```bash
make start-bg    # démarrage en arrière-plan
make logs        # vérifier que tout démarre correctement
```

Le site est accessible à `http://localhost:3000`. Pour l'exposer publiquement, configurer un reverse proxy (voir section suivante).

---

## 7. Reverse proxy Nginx (recommandé)

Nginx expose le site sur le port 80/443 et redirige vers Next.js sur le port 3000.

### Installation

```bash
sudo apt-get install -y nginx
```

### Configuration

Créer le fichier `/etc/nginx/sites-available/mogoux` :

```nginx
server {
    listen 80;
    server_name votre-domaine.fr www.votre-domaine.fr;

    # Taille max pour les uploads (documents d'archive peuvent être lourds)
    client_max_body_size 500M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Activer et recharger :

```bash
sudo ln -s /etc/nginx/sites-available/mogoux /etc/nginx/sites-enabled/
sudo nginx -t          # vérifier la syntaxe
sudo systemctl reload nginx
```

### HTTPS avec Let's Encrypt (Certbot)

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d votre-domaine.fr -d www.votre-domaine.fr
```

Certbot modifie automatiquement la config Nginx pour rediriger HTTP → HTTPS et ajoute le renouvellement automatique.

---

## 8. Service systemd (démarrage automatique)

Pour que le serveur redémarre automatiquement après un reboot ou un crash.

Créer `/etc/systemd/system/mogoux.service` :

```ini
[Unit]
Description=Webdocumentaire Mémoires Ouvrières
After=network.target postgresql.service

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/mogoux/app
ExecStart=/usr/bin/node_modules/.bin/next start -p 3000
Restart=on-failure
RestartSec=5
Environment=NODE_ENV=production
EnvironmentFile=/var/www/mogoux/app/.env
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

> Adapter `WorkingDirectory` si le projet n'est pas dans `/var/www/mogoux`.

Activer le service :

```bash
sudo systemctl daemon-reload
sudo systemctl enable mogoux
sudo systemctl start mogoux
sudo systemctl status mogoux
```

Voir les logs :

```bash
sudo journalctl -u mogoux -f    # logs en temps réel
sudo journalctl -u mogoux -n 100  # 100 dernières lignes
```

---

## 9. Mise à jour du code

```bash
cd /var/www/mogoux
git pull                  # récupérer les nouvelles modifications
make build                # reconstruire l'application
make restart              # redémarrer le serveur
```

Si des collections ont été modifiées :

```bash
git pull
cd app && npm run migrate # appliquer les migrations
make build
make restart
```

---

## 10. Déploiement dans un sous-répertoire

Si le site doit être accessible à `https://exemple.fr/mogoux` (et non à la racine) :

```env
# Dans app/.env
NEXT_PUBLIC_BASE_PATH=/mogoux
NEXT_PUBLIC_SERVER_URL=https://exemple.fr
```

Puis reconstruire :
```bash
make build
make restart
```

Configuration Nginx correspondante :

```nginx
location /mogoux {
    proxy_pass http://127.0.0.1:3000;
    # ... (mêmes headers que précédemment)
}
```

---

## Commandes de maintenance utiles

```bash
# Vérifier l'état du serveur
make logs              # logs nohup (si make start-bg)
sudo journalctl -u mogoux -f  # logs systemd

# Gérer la base de données
sudo -u postgres psql -d mogoux -c "\dt"   # lister les tables
sudo -u postgres psql -d mogoux            # console PostgreSQL

# Sauvegardes
pg_dump -U fanum -h 127.0.0.1 mogoux > backup_$(date +%Y%m%d).sql

# Espace disque (les médias peuvent prendre de la place)
du -sh app/public/medias/
du -sh app/public/documents/

# Nettoyer et reconstruire
make clean     # supprime .next et node_modules
make deps      # réinstalle node_modules
make build     # reconstruit
```
