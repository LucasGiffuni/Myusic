# MYUSIC #

### Comandos para iniciar el proyecto ###

#### Ejecutar backend ####

Si el S.O es WINDOWS:

    npm i
    set NODE_ENV=development&&npm run dev

Si el S.O es MACOS:

    npm i
    NODE_ENV=development npm run dev

#### Ejecutar Frontend ####

    npm i   
    npm run start


### Subir imagen a azure image registry ###

az acr login --name myusicimages
docker tag myusic-backend myusicimages.azurecr.io/myusic-backend 
docker tag myusic-frontend myusicimages.azurecr.io/myusic-frontend 

docker push myusicimages.azurecr.io/myusic-backend