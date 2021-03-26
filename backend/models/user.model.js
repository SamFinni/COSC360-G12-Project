const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
// modifying the schema below will modify the database schema
const User = sequelize.define('user', {
    email: { 
        type: DataTypes.STRING(64),
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    bio: {
        type: DataTypes.STRING(2048),
    },
    image: {
        type: DataTypes.BLOB
    },
    admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    disabled: {
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
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },}, {
        instanceMethods: {
            generateHash(password) {
                return bcrypt.hash(password, bcrypt.genSaltSync(8));
            },
            validPassword(password) {
                return bcrypt.compare(password, this.password);
            }
        }
    });

// automatically creates the database table if it doesn't exist (with letter 's' appended)
// modifies schema if table exists and schema above was updated
User.sync({
    alter: true,
});

module.exports = User;