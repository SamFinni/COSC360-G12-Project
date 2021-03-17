const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

// modifying the schema below will modify the database schema
const Comment = sequelize.define('comment', {
    pid: {
        type: DataTypes.INTEGER,
       // references: 'posts',
       // referencesKey: 'id',
    },
    uid: { // default field, but we want to customize it
        type: DataTypes.INTEGER,
      //  references: 'users',
       // referencesKey: 'id',
    },
    body: { // default field, but we want to customize it
        type: DataTypes.STRING,
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
Comment.sync({
    alter: true,
});

module.exports = Comment;