const sequelize = require('sequelize');
const db = require('../configs/db');
const bcrypt = require('bcrypt');
const Usuarios = db.define(
    "usuarios", {
        idusuarios: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        password: {
            type: sequelize.STRING(45),
            allowNull: false,
        },
        nombe_usuario: {
            type: sequelize.STRING(45),
            allowNull: false,
        },
        apellido_usuario: {
            type: sequelize.STRING(45),
            allowNull: false,
        },
        email: {
            type: sequelize.STRING(45),
            allowNull: false,
        },
    }, {
        tableName: "usuarios",
        timestamps: false,
        hook: {
            beforeCreate(usuarios) {
                const hash = bcrypt.hashSync(usuarios.password, 10);
                usuarios.password = hash;
            },
            beforeUpdate(usuarios) {
                const hash = bcrypt.hashSync(usuarios.password, 10);
                usuarios.password = hash;
            }
        },
    },
);
module.exports = Usuario;