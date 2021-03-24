const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

// modifying the schema below will modify the database schema
const PostScore = sequelize.define('postscore', {
    pid: {
        type: DataTypes.INTEGER,
        references: {
            model: 'posts',
            key: 'id'
        },
    },
    uid: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
    },
    score: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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

PostScore.sync({
    alter: true,
});

module.exports = PostScore;