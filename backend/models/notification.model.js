const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

// modifying the schema below will modify the database schema
const Notification = sequelize.define('notification', {
    uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    title: {
        type: DataTypes.STRING(1024),
        allowNull: false,
    },
    text: {
        type: DataTypes.STRING(1024),
        allowNull: false,
    },
    link: { // eg, "/post/46236"
        type: DataTypes.STRING(256),
        allowNull: true,
    },
    seen: {
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
Notification.sync({
    alter: true,
});

module.exports = Notification;