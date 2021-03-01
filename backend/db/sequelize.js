const env = require('../config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.DATABASE_NAME, env.DATABASE_USER, env.DATABASE_PASS, {
    host: env.DATABASE_IP,
    dialect: 'mariadb',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
})

module.exports = sequelize;