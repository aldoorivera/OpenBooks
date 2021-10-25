const Marcador = require('../models/generos_librosModel');
const msj = require('../components/message');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
exports.listar = async(req, res) => {
    try {
        const { Generos } = req.query;
        const categoria = await categoria.findAll({
            where: {
                idgl: idgl
            }
        });
        msj("Procesado correctamente", 200, Generos, res);

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
            res.send("Debe enviar los datos completos.");
        } else {
            try {
                const nuevaCategoria = Categoria.create({
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
        const { idgl } = req.query;
        if (!idgl) {
            res.send("Debe enviar el id del genero.");
        } else {
            const buscarcategoria = await Categoria.findOne({
                where: {
                    idgl: idgl,
                }
            });
            if (!buscarcategoria) {
                res.send("La categoria no existe.");
            } else {
                try {
                    await Categoria.destroy({
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

exports.buscarcategoria = async(req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        msj("Datos erroneos.", 200, validacion.array(), res);
    } else {
        const { idgl, idlibros } = req.query;
        if (!idgl) {
            res.send("Debe enviar el id del genero");
        } else {
            try {
                const Categoria = await Categoria.findOne({
                    where: {
                        idgl: idgl,
                        idlibros: idlibros
                    }
                });
                if (!Categoria) {
                    msj("No hay categoria.", 200, Categoria, res);
                } else {
                    msj("Datos procesados correctamente.", 200, Categoria, res);
                }
            } catch (error) {

            }
        }
    }
};