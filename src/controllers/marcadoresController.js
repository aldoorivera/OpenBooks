const Marcador = require('../models/marcadoresModel');
const Autores = require('../models/autoresModel');
const Libros = require('../models/librosModel');
const Usuarios = require('../models/usuarioModel');
const msj = require('../components/message');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
exports.SelectAll = async(req, res) => {
    try {
        const { usuario } = req.body;
        const libros = await Libros.findAll({
            include: [{
                    model: Autores,
                    attributes: ['nombre_autor']
                },
                {
                    model: Usuarios,
                    attributes: ['idusuarios'],
                    where: { idusuarios: usuario }
                }
            ],
        });
        msj("Procesado correctamente", 200, libros, res);

    } catch (error) {
        msj("Error", 500, error, res);
        console.log(error);
    }
};
exports.Insert = async(req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        msj("Error con los datos.", 200, validacion.array(), res);
    } else {
        const { idusr, idlibros } = req.body;
        if (!idusr && !idlibros) {
            msj("Datos incompletos.", 200, validacion.array(), res);
        } else {
            try {
                const marcadores = await Marcador.findOne({
                    where: {
                        idusuarios: idusr,
                        idlibros: idlibros
                    }
                });
                if (!marcadores) {
                    try {
                        const nuevoMarcador = Marcador.create({
                            idusuarios: idusr,
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
                } else {
                    msj("Ya existe el registro.", 200, marcadores, res);
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
        msj("Error con los datos.", 200, validacion.array(), res);
    } else {
        const { idusr, idlibros } = req.body;
        if (!idusr && idlibros) {
            res.send("Debe enviar el id del Marcador y el libro.");
        } else {
            const searchMarcador = await Marcador.findOne({
                where: {
                    idusuarios: idusr,
                    idlibros: idlibros
                }
            });
            if (!searchMarcador) {
                res.send("El Marcador no existe.");
            } else {
                try {
                    await Marcador.destroy({
                        where: {
                            idusuarios: idusr,
                            idlibros: idlibros
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
        const { idusr, idlibros } = req.body;
        if (!idusr && !idlibros) {
            msj("Debe enviar el id.", 200, validacion.array(), res);
        } else {
            try {
                const libros = await Libros.findOne({
                    include: [{
                            model: Autores,
                            attributes: ['nombre_autor']
                        },
                        {
                            model: Usuarios,
                            attributes: ['idusuarios'],
                            where: { idusuarios: idusr }
                        }
                    ],
                    where: { idlibros: idlibros }
                });
                msj("Procesado correctamente", 200, libros, res);

            } catch (error) {
                msj("Error", 500, error, res);
                console.log(error);
            }
        }
    }
};