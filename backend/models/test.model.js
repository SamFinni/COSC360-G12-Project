const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

// modifying the schema below will modify the database schema
const Test = sequelize.define('test', {
    title: { 
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        defaultValue: 0.00,
    },
    createdAt: { // default field, but we want to customize it
        type: DataTypes.DATE(3),
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
    },
    updatedAt: { // default field, but we want to customize it
        type: DataTypes.DATE(3),
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
    },
});

// automatically creates the database table if it doesn't exist (with letter 's' appended)
// modifies schema if table exists and schema above was updated
Test.sync({
    alter: true,
});

module.exports = Test;