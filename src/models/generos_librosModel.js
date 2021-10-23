const sequelize = require('sequelize');
const db = require('../configs/db');
const Libros_categorias = db.define(
    "libro_categorias", {
        idlg: {
            type: sequelize.INTEGER,
            allowNull: false,
        },
        idlibros: {
            type: sequelize.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: "libro_categorias",
        timestamps: false,
    }
);