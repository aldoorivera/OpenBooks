const sequelize = require('sequelize');
const db = new sequelize(
    'DB_Name',
    'root',
    'password', {
        host: 'localhost',
        dialect: 'mysql',
        port: '3306'
    }
);
module.exports = db;