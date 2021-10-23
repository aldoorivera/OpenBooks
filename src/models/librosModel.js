const sequelize = require('sequelize');
const db = require('../config/db');
const libros = db.define(
    "libros",
    {
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
            type: sequelize.STRING(45),
            allowNull: false,
        },
        libro:{
            type: sequelize.LONGBLOD,
            allowNull: false,
        },
        img_libro:{
            type: sequelize.BLOB,
            allowNull: true,
        },
        id_autores:{
            type: sequelize.INTEGER,
            allowNull: false,
        },
        editorial:{
            type: sequelize.STRING(45),
            allowNull: false,
        },
    },
    {
        tableName: "libros",
        timestamps: false,
    }
);
module.exports = libros;