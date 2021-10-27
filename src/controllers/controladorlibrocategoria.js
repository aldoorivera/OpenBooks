const Genero = require('../models/generos_librosModel');
const msj = require('../components/message');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
exports.listar = async(req, res) => {
    try {
        const { idlibro } = req.query;
        const generos = await Genero.findAll({
            where: {
                idlibros: idlibro
            }
        });
        msj("Procesado correctamente", 200, generos, res);

    } catch (error) {
        msj("Error", 500, error, res);
    }
};
exports.Guardar = (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        msj("Error con los datos.", 200, validacion.array(), res);
    } else {
        const { idgl, idlibros } = req.body;
        if (!idgl || !idlibros) {
            msj("Datos incompletos.", 200, validacion.array(), res);
        } else {
            try {
                const nuevoGenero = Genero.create({
                    idgl: idgl,
                    idlibros: idlibros
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

exports.Eliminar = async(req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        msj("Error con los datos.", 200, validacion.array(), res);
    } else {
        const { idgl, idlibro } = req.query;
        if (!idgl && !idlibro) {
            msj("Debe enviar el id.", 200, validacion.array(), res);
        } else {
            const buscarGenero = await Genero.findOne({
                where: {
                    idgl: idgl,
                    idlibros: idlibro
                }
            });
            if (!buscarGenero) {
                msj("El Genero no existe.", 200, null, res);
            } else {
                try {
                    await Genero.destroy({
                        where: {
                            idgl: idgl,
                            idlibros: idlibro
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

exports.buscarGenero = async(req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        msj("Datos erroneos.", 200, validacion.array(), res);
    } else {
        const { idgl, idlibros } = req.query;
        if (!idgl && !idlibros) {
            msj("Debe enviar el id.", 200, validacion.array(), res);
        } else {
            try {
                const generos = await Genero.findOne({
                    where: {
                        idgl: idgl,
                        idlibros: idlibros
                    }
                });
                if (!generos) {
                    msj("No hay Genero.", 200, null, res);
                } else {
                    msj("Datos procesados correctamente.", 200, generos, res);
                }
            } catch (error) {
                msj("ERROR", 500, error, res);
            }
        }
    }
};