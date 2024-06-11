# GOU

## Deploy

```sh
git clone git@github.com/PaquierThomas/Gou.git

cp web/.env.example web/.env
cp cms/.env.example cms/.env


docker build -t gou-web:latest web
docker build -t gou-cms:latest cms
docker compose up -d
```

## Remplir les .env de CMS et WEB

```sh
nano web/.env
ou
vi web/.env

nano cms/.env
ou
vi cms/.env

appuyer sur I puis :qw pour quitter

```
