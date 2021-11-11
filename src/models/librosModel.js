const sequelize = require('sequelize');
const autor = require('../models/autoresModel');
const categorias = require('../models/generosModel');
const union = require('../models/generos_librosModel');
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
        idautores: {
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
//relacion autor-libro
autor.hasOne(libros, { foreignKey: 'idautores' });
libros.belongsTo(autor, { foreignKey: 'idautores' });

//relacion categoria-libro
//libros.belongsToMany(categorias, { through: union, foreignKey: 'idlibros' });
//categorias.belongsToMany(libros, { through: union, foreignKey: 'idgl' });

module.exports = libros;