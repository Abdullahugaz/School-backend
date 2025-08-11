require('dotenv').config();
const { Sequelize } = require('sequelize');

// Create Sequelize instance using .env variables
const sequelize = new Sequelize(
  process.env.DB_NAME,     
  process.env.DB_USER,     
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false // set to console.log to see SQL queries
  }
);

module.exports = sequelize;
