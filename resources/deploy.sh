# obsolete, gardé ici juste pour traces
# docker build -t "gou-cms" cms
# docker run -d -p 3000:3000 --name gou-cms gou-cms
docker build -t "gou-web" web
docker run -d -p 8080:4321 --name gou-web gou-web
# Décommentez les lignes ci-dessus pour déployer le serveur de base de données
