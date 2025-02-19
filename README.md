# backend turnos
npm install
npm run dev for development
npm run prod for production

# sequelize
# create new migration

npx sequelize-cli migration:generate --name migrationName
correr con npx sequelize-cli db:migrate luego de hacer los cambios en el nuevo archivo en carpeta migrations
para deshacer se puede borrar manualmente la tabla y borrar la migracion y el archivo o usar npx sequelize-cli db:migrate:undo
si tiene los cambios en 'Down'
