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
                [Op.or]: [
                    { email: usuario },
                    { idusuarios: usuario }
                ]
            }
        });
        if (!BuscarUsuario) {
            msj("El Usuario no existe o la contraseña no coincide.", 200, [], res);
        } else {
            if (!BuscarUsuario.comparePassword(password, BuscarUsuario.password)) {
                msj("El Usuario no existe o contraseña invalida", 200, [], res);
            } else {
                const usr = {
                    email: BuscarUsuario.email,
                    idusuarios: BuscarUsuario.idusuarios,
                    nombe_usuario: BuscarUsuario.nombe_usuario,
                    apellido_usuario: BuscarUsuario.apellido_usuario
                };
                const token = passport.getToken({ idusuarios: BuscarUsuario.idusuarios });
                const data = {
                    token: token,
                    usuario: usr
                };
                msj("Bienvenido, " + usr.nombe_usuario + " " + usr.apellido_usuario, 200, data, res);
            }
        }
    }
};
exports.ValidarToken = async(req, res) => {
    const { data } = req.body;
    msj("Token invalido", 200, data, res);
    console.log(data);
};
exports.enviarToken = async(req, res) => {
    const { data } = req.body;
    res.status(200).json(data);
};