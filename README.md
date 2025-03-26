
# File Manager
Desplegar el proyecto en local
- node 18
- npm i
- solicitar variables de entorno .env
- npm run start:dev


Desplegar el proyecto en docker
- docker-compose up -d


Subir proyecto a dockerhub
- docker build -t harold1013/file-manager:latest .
- docker push harold1013/file-manager:latest 

Subir proyecto a GCP
- docker buildx build -t file-manager --platform linux/amd64 .
- docker tag file-manager gcr.io/haroldscc-test/file-manager
- docker push gcr.io/haroldscc-test/file-manager


docker buildx build -t file-manager --platform linux/amd64 . && docker tag file-manager gcr.io/haroldscc-test/file-manager && docker push gcr.io/haroldscc-test/file-manager