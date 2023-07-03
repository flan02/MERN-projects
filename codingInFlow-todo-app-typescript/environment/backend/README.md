# MERN typescript
*Aqui iremos definiendo todas las condiseraciones importantes de este proyecto de 8hs del canal de youtube: 'coding in flow'*

npx tsc (para compilar ts en js)

## Instalamos nodemon p/ Hot Reloading y luego ts-node p/ typescript.
** $ npm install -D ts-node ** (-D = --save-dev)

## Instalamos un linter p/ depurar nuestro codigo
** $ npm install -D eslint **
Luego lo iniciamos con: $ npx eslint --init (creamos nuestra configuracion)
Sino tenemos un script en package.json de todas formas podemos correr nuestro linter usando
** $ npx eslint . --ext .ts **

## Link para copiar un archivo .gitignore prolijo
** https://github.com/github/gitignore/blob/main/Node.gitignore **

## Dependencia "express-session" (es como JWT per mas facil)
** $ npm install express-session** y ** $ npm install @types/express-session **
*Instalar la session de Redis-based store pq es muy rapida y nosotros estamos conectados a mdbAtlas en la nube.* (Es mas dificil de configurar que la session p/ mongodb).
** $ npm install connect-mongo **