const sequelize = require('sequelize');
const db = require('../configs/db');
const Marcadores = db.define(
    "marcadores",
    {
        idusuarios: {
            type: sequelize.INTEGER,
            allowNull: false,
        },
        idlibros: {
            type: sequelize.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "marcadores",
        timestamps: false,
    }
);
module.exports = Marcadores;