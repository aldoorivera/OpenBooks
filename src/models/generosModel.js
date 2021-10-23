const sequelize = require('sequelize');
const db = require('../config/db');
const libros = db.define(
    "generos_literarios",
    {
        idgl: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        generos_literarios: {
            type: sequelize.STRING(45),
            allowNull: false,
        },
    },
    {
        tableName: "generos_literarios",
        timestamps: false,
    }
);
module.exports = generos_literarios;