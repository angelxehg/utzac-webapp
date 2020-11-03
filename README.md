# UTZAC Webapp

Autores y Libros: Aplicación Web con Express, Angular y MongoDB

[Documentación API](./docs/api.md)

## Instalación

Use estos comandos para instalar de manera local.

- Instalar dependencias: `npm install`

- Iniciar servidor express: `npm run start`

- Iniciar aplicación Angular: `ng serve --open`. Requiere Angular CLI.

## Despliegue en heroku

Use estos comandos para desplegar en Heroku. Requiere una base de datos en MongoDB Atlas u otro proveedor.

- Crear aplicación: `heroku create`

- Configura clave secreta: `heroku config:set SECRET="[Tu clave secreta]"`

- Configura la base de datos: `heroku config:set DATABASE_URL="[URL de la base de datos]"`

- Subir cambios a Heroku: `git push heroku main`
