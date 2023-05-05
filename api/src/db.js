require('dotenv').config();
const { DB_USER, DB_PASS, DB_HOST, DB_NAME} = process.env;

const { Sequelize } = require('sequelize');

// REQUIRE MODELS "const characterModel = require('./models/Character')"



const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`,
   { logging: false, native: false }
);

// models "characterModel(sequelize);" 



// Definir los modelos y sus realaciones




module.exports = {
   ...sequelize.models,
   conn: sequelize,
   sequelize
};
