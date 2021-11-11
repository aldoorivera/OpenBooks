const sequelize = require('sequelize');
const usuario = require('../models/usuarioModel');
const libros = require('../models/librosModel');
const db = require('../configs/db');
const Marcadores = db.define(
    "marcadores", {
        idusuarios: {
            type: sequelize.STRING(45),
            allowNull: false,
        },
        idlibros: {
            type: sequelize.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: "marcadores",
        timestamps: false,
    }
);
libros.belongsToMany(usuario, { through: Marcadores, foreignKey: 'idlibros' });
usuario.belongsToMany(libros, { through: Marcadores, foreignKey: 'idusuarios' });
module.exports = Marcadores;