const sequelize = require('sequelize');
const db = new sequelize(
    'openbooks',
    'root',
    'password', {
        host: 'localhost',
        dialect: 'mysql',
        port: '3306'
    }
);
module.exports = db;