const GeneroL = require('../models/generosModel');
const { validationResult } = require('express-validator');
const msj = require('../components/message');
const { Op } = require("sequelize");
exports.SelectAll = async(req, res) => {
    try {
        const generosL = await GeneroL.findAll();
        msj("Datos procesados.", 200, generosL, res);
    } catch (error) {
        msj("ERROR", 500, error, res);
    }

};
exports.Insert = async(req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        msj("Datos erroneos.", 200, validacion.array(), res);
    } else {
        const { genero } = req.body;
        console.log(genero);
        if (!genero) {
            msj("Faltan datos requeridos.", 200, validacion.array(), res);
        } else {
            try {
                const searchGenre = await GeneroL.findOne({
                    where: {
                        generos_literarios: genero
                    }
                });
                if (!searchGenre) {
                    const nuevoGeneroL = GeneroL.create({
                        generos_literarios: genero,
                    }).then((data) => {
                        msj("Datos procesados correctamente.", 200, data, res);
                    }).catch((error) => {
                        msj("Error al procesar los datos.", 200, error, res);
                    });
                } else {
                    mensaje = {
                        msj: "Genero literario existente."
                    }
                    msj("Error al ingresar los datos.", 200, mensaje, res);
                }

            } catch (error) {
                msj("ERROR", 500, error, res);
            }
        }
    }
};

exports.Delete = async(req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        msj("Datos erroneos.", 200, validacion.array(), res);
    } else {
        const { idgl } = req.query;
        if (!idgl) {
            res.send("Debe enviar el id del GeneroL.");
        } else {
            const searchGeneroL = await GeneroL.findOne({
                where: {
                    idgl: idgl,
                }
            });
            if (!searchGeneroL) {
                msj("Genero inexistente.", 200, null, res);
            } else {
                try {
                    await GeneroL.destroy({
                        where: {
                            idgl: idgl,
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