# GOU

## Deploy

```sh
git clone https://github.com/PaquierThomas/Gou.git

cp web/.env.example .env
cp cms/.env.example .env


docker build -t gou-web:latest web
docker build -t gou-cms:latest cms
docker compose up -d
```
