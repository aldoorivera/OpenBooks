const sequelize = require('sequelize');
const db = require('../configs/db');
const bcrypt = require('bcrypt');
const Usuarios = db.define(
    "usuario", {
        idusuarios: {
            type: sequelize.STRING(45),
            primaryKey: true,
            allowNull: false,
        },
        password: {
            type: sequelize.STRING(250),
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
            type: sequelize.STRING(250),
            allowNull: false,
            unique: true
        },
    }, {
        tableName: "usuarios",
        timestamps: false,
        hooks: {
            beforeCreate(usuario) {
                const hash = bcrypt.hashSync(usuario.password, 10);
                usuario.password = hash;
            },
            beforeUpdate(usuario) {
                const hash = bcrypt.hashSync(usuario.password, 10);
                usuario.password = hash;
            }
        },
    },
);
Usuarios.prototype.comparePassword = (pass, com) => {
    return bcrypt.compareSync(pass, com);
}
module.exports = Usuarios;