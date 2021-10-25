const sequelize = require('sequelize');
const db = require('../configs/db');
const libros = db.define(
    "libros", {
        idlibros: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre_libro: {
            type: sequelize.STRING(45),
            allowNull: false,
        },
        num_paginas: {
            type: sequelize.INTEGER,
            allowNull: false,
        },
        descripcion: {
            type: sequelize.STRING(500),
            allowNull: true,
        },
        libro: {
            type: sequelize.BLOB,
            allowNull: false,
        },
        img_libro: {
            type: sequelize.BLOB,
            allowNull: false,
        },
        id_autores: {
            type: sequelize.INTEGER,
            allowNull: false,
        },
        editorial: {
            type: sequelize.STRING(45),
            allowNull: true,
        },
    }, {
        tableName: "libros",
        timestamps: false,
    }
);
module.exports = libros;