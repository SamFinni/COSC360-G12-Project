const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

// modifying the schema below will modify the database schema
const Friend = sequelize.define('friend', {
    uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    fuid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    accepted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
Friend.sync({
    alter: true,
});

module.exports = Friend;