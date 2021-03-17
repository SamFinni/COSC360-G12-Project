const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

// modifying the schema below will modify the database schema
const PostReport = sequelize.define('postreport', {
    pid: { 
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    uid: { 
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    reason: {
        type: DataTypes.STRING(2048),
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
PostReport.sync({
    alter: true,
});

module.exports = PostReport;