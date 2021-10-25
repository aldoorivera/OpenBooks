const Usuario = require('../models/usuarioModel');
const msj = require('../components/message');
const { Op } = require("sequelize");
exports.listar = async(req, res) => {
    try {
        const Usuario = await Usuario.findAll();
    } catch (error) {
        msj("ERROR", 500, error, res);
    }

};

exports.GuardarUsuario = (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        msj("Datos erroneos.", 200, validacion.array(), res);
    } else {
        const { password, nombre_usuario, apellido_usuario, email } = req.body;
        console.log(password, nombre_usuario, apellido_usuario, email);
        if (!password || !nombre_usuario || !apellido_usuario || !email) {
            res.send("Debe enviar los datos completos");
        } else {
            try {
                const UsuarioNuevo = Usuario.create({
                    password: password,
                    nombre_usuario: nombre_usuario,
                    apellido_usuario: apellido_usuario,
                    email: email
                }).then((data) => {
                    msj("Registro almacenado correctamente.", 200, data, res);
                }).catch((error) => {
                    msj("Error al guardar los datos.", 200, data, res);
                });
            } catch (error) {
                msj("ERROR", 500, error, res);
            }
        }
    }
};

exports.EliminarUsuario = async(req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        msj("Datos erroneos.", 200, validacion.array(), res);
    } else {
        const { id_usuario } = req.query;
        if (!id_usuario) {
            res.send("Debe enviar el id del usuario.");
        } else {
            const buscarUsuario = await Usuario.findOne({
                where: {
                    id_usuario: id_usuario,
                }
            });
            if (!buscarUsuario) {
                res.send("El libro no existe.");
            } else {
                try {
                    await Usuario.destroy({
                        where: {
                            id_usuario: id_usuario,
                        }
                    }).then((data) => {
                        msj("El registro ha sido eliminado", 200, data, res);
                    }).catch((error) => {
                        msj("Datos no procesados.", 200, data, res);
                    });
                } catch (error) {
                    msj("ERROR", 500, error, res);
                }
            }
        }
    }
};

exports.ActualizarUsuario = async(req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        msj("Datos erroneos.", 200, validacion.array(), res);
    } else {
        const { id_usuario } = req.query;
        const { password, nombre_usuario, apellido_usuario, email } = req.body;
        console.log(password, nombre_usuario, apellido_usuario, email);
        if (!id) {
            msj("Datos incompletos.", 200, data, res);
        } else {
            var buscarUsuario = await Usuario.findOne({
                where: {
                    id_usuario: id_usuario,
                }
            });
            if (!buscarUsuario) {
                msj("Datos inexistentes.", 200, data, res);
            } else {
                try {
                    if (!password || !nombre_usuario || !apellido_usuario || !email) {
                        msj("Datos incompletos.", 200, data, res);
                    } else {
                        buscarUsuario.password = password;
                        buscarUsuario.nombre_usuario = nombre_usuario;
                        buscarUsuario.apellido_usuario = apellido_usuario;
                        buscarUsuario.email = email;
                        await buscarUsuario.save();
                        msj("Datos procesados correctamente.", 200, data, res);
                    }
                } catch (error) {
                    msj("ERROR", 500, error, res);
                }
            }
        }
    }
};