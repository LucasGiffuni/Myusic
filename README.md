# MYUSIC #

### Comandos para iniciar el proyecto ###

#### Ejecutar backend ####

Si el S.O es WINDOWS:

    cd backend
    npm i
    set NODE_ENV=development&&npm run dev

Si el S.O es MACOS:

    cd backend
    npm i
    NODE_ENV=development npm run dev

#### Ejecutar Frontend ####

    cd frontend
    npm i   
    npm run start


### Subir imagen a azure image registry ###

az login
az acr login --name myusicimages
docker tag myusic-backend myusicimages.azurecr.io/myusic-backend
docker tag myusic-frontend myusicimages.azurecr.io/myusic-frontend

docker push myusicimages.azurecr.io/myusic-backend
docker push myusicimages.azurecr.io/myusic-frontend

## OTROS ##

### MER ###

![MER](/resources/MER%20Myusic.jpg "MER")



### FIGMA ###
https://www.figma.com/file/XCuXlozEHFmrN48AsN8Kjz/Myusic?type=design&node-id=24%3A298&mode=design&t=RxmWuq1iwJZuwCPc-1