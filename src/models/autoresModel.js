const sequelize = require('sequelize');
const db = require('../config/db');
const libros = db.define(
    "autores",
    {
        idautores: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre_autor: {
            type: sequelize.STRING(45),
            allowNull: false,
        },
    },
    {
        tableName: "autores",
        timestamps: false,
    }
);
module.exports = autores;