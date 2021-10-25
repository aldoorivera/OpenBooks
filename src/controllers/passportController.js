const ModeloUsuario = require('../models/usuarioModel');
const { validationResult } = require('express-validator');
const msj = require('../components/message');
const passport = require('../configs/passport');
const { Op } = require("sequelize");
exports.validarAutenticado = passport.validarAutenticado;
exports.Login = async(req, res, next) => {
    const validation = validationResult(req);
    if (!validation.isEmpty) {
        msj("Los datos ingresados no son validos", 200, validation.array(), res);
    } else {
        const { usuario, password } = req.body;
        const BuscarUsuario = await ModeloUsuario.findOne({
            where: {
                [Op.and]: [{
                    [Op.or]: [
                        { email: usuario },
                        { idusuario: usuario }
                    ]
                }],
            }
        });
        if (!BuscarUsuario) {
            msj("El Usuario no existe o se encuentra inactivo", 200, [], res);
        } else {
            if (!BuscarUsuario.verificarPassword(password, BuscarUsuario.password)) {
                msj("El Usuario no existe o contraseña invalida", 200, [], res);
            } else {
                const usr = {
                    email: BuscarUsuario.correo,
                    idusuario: BuscarUsuario.idusuario,
                    nombre_usuario: BuscarUsuario.nombre_usuario,
                    apellido_usuario: BuscarUsuario.apellido_usuario
                };
                const token = passport.getToken({ idusuario: BuscarUsuario.idusuario });
                const data = {
                    token: token,
                    Usuario: usr
                };
                msj("Bienvenido, " + usr.nombre_usuario + " " + usr.apellido_usuario, 200, data, res);
            }
        }
    }
};
exports.ValidarToken = async(req, res) => {
    const { data } = req.body;
    msj("Token invalido", 200, data, res);
};
exports.enviarToken = async(req, res) => {
    const { data } = req.body;
    res.status(200).json(data);
};