require('dotenv').config();

module.exports = {
  development: {
    dialect: 'sqlite',
    logging: console.log, 
    storage: './dev.sqlite', // Onde o arquivo será criado
  },
  test: {
    dialect: 'sqlite',
    logging: false,
    storage: ':memory:', // Para testes rodar em memória
  },
  production: {
    // configurações do MySQL para quando subir pro servidor
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
  },
};