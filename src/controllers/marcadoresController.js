const Marcador = require('../models/mModel');
const msj = require('../components/message');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
exports.SelectAll = async(req, res) => {
    try {
        const { usuario } = req.query;
        const Marcador = await Marcador.findAll({
            where: {
                idusuarios: usuario
            }
        });
        msj("Procesado correctamente", 200, Marcador, res);

    } catch (error) {
        msj("Error", 500, error, res);
    }
};
exports.Insert = (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        msj("Error con los datos.", 200, validacion.array(), res);
    } else {
        const { idusr, idlibro } = req.body;
        if (!idusr || !idlibro) {
            res.send("Faltan datos requeridos.");
        } else {
            try {
                const nuevoMarcador = Marcador.create({
                    idusuarios: idusr,
                    idlibros: idlibro
                }).then((data) => {
                    console.log(data);
                    res.send("Registro almacenado correctamente");
                    msj("Datos procesados correctamente.", 200, data, res);
                }).catch((error) => {
                    msj("Error al procesar los datos.", 200, error, res);
                });
            } catch (error) {
                msj("ERROR", 500, error, res);
            }
        }
    }
};

exports.Delete = async(req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        msj("Error con los datos.", 200, validacion.array(), res);
    } else {
        const { idusr } = req.query;
        if (!idusr) {
            res.send("Debe enviar el id del Marcador.");
        } else {
            const searchMarcador = await Marcador.findOne({
                where: {
                    idusuarios: idusr,
                }
            });
            if (!searchMarcador) {
                res.send("El Marcador no existe.");
            } else {
                try {
                    await Marcador.destroy({
                        where: {
                            idusuarios: idusr,
                        }
                    }).then((data) => {
                        msj("Datos procesados correctamente.", 200, data, res);
                    }).catch((error) => {
                        msj("Error al procesar los datos.", 200, error, res);
                    });
                } catch (error) {
                    msj("ERROR", 500, error, res);
                }
            }
        }
    }
};

exports.CheckBook = async(req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        msj("Datos erroneos.", 200, validacion.array(), res);
    } else {
        const { idlibro, usuario } = req.query;
        if (!id) {
            res.send("Debe enviar el id del usuario");
        } else {
            try {
                const Marcador = await Marcador.findOne({
                    where: {
                        idusuarios: usuario,
                        idlibros: idlibro
                    }
                });
                if (!Marcador) {
                    msj("No hay amrcador.", 200, Marcador, res);
                } else {
                    msj("Datos procesados correctamente.", 200, Marcador, res);
                }
            } catch (error) {

            }
        }
    }
};