const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

// temporary password reset keys, for 'forgot password' feature

// modifying the schema below will modify the database schema
const ResetKey = sequelize.define('resetkey', {
    uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    rkey: {
        type: DataTypes.STRING(64),
        allowNull: false,
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
ResetKey.sync({
    alter: true,
});

module.exports = ResetKey;