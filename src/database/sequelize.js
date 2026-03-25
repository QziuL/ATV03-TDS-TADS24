const { Sequelize } = require('sequelize');
const config = require('./config');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = dbConfig.storage
  ? new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: false,
  })
  : new Sequelize({ dialect: 'sqlite', storage: dbConfig.storage, logging: dbConfig.logging });
 
    
module.exports = sequelize;
