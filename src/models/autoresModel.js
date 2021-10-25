const sequelize = require('sequelize');
const db = require('../configs/db');
const autores = db.define(
    "autores", {
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
    }, {
        tableName: "autores",
        timestamps: false,
    }
);
module.exports = autores;