const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

// modifying the schema below will modify the database schema
const CommentScore = sequelize.define('commentscore', {
    cid: {
        type: DataTypes.INTEGER,
       // references: 'comments',
       // referencesKey: 'id',
    },
    uid: { // default field, but we want to customize it
        type: DataTypes.INTEGER,
      //  references: 'users',
       // referencesKey: 'id',
    },
    score: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    vote: {
        type: DataTypes.INTEGER,
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
CommentScore.sync({
    alter: true,
});

module.exports = CommentScore;