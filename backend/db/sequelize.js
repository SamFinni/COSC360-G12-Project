const cfg = require('../config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(cfg.DATABASE_NAME, cfg.DATABASE_USER, cfg.DATABASE_PASS, {
    host: cfg.DATABASE_IP,
    dialect: 'mariadb',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
})

module.exports = sequelize;