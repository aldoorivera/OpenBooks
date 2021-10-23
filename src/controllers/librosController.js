const Libro = require('');
const msj = require('../components/message');
const { Op } = require("sequelize");
const { validationResult } = require('express-validator');
exports.SelectAll = async(req, res) => {
    try {
        const Libro = await Libro.findAll();
    } catch (error) {
        msj("ERROR", 500, error, res);
    }

};
exports.Search = async(req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        msj("Datos erroneos.", 200, validacion.array(), res);
    } else {
        try {
            const filter = '%' + req.body.nombre_libro + '%';
            const Libro = await Libro.findAll({
                where: {
                    nombre_libro: {
                        [Op.like]: filter,
                    },
                }
            });
        } catch (error) {
            msj("ERROR", 500, error, res);
        }
    }

};
exports.Insert = (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        msj("Datos erroneos.", 200, validacion.array(), res);
    } else {
        const { nombre, num_paginas, descripcion, archivo, portada, autorid, editorial } = req.body;
        console.log(nombre, num_paginas, descripcion, archivo, portada, autorid, editorial);
        if (!nombre || !num_paginas || !descripcion || !archivo || !portada || !autorid) {
            res.send("Faltan datos requeridos.");
        } else {
            try {
                const nuevoLibro = Libro.create({
                    nombre_libro: nombre,
                    num_paginas: num_paginas,
                    descripcion: descripcion,
                    libro: archivo,
                    img_libro: portada,
                    idautores: autorid,
                    editorial: editorial
                }).then((data) => {
                    msj("Datos procesados correctamente.", 200, data, res);
                }).catch((error) => {
                    msj("Error al procesar los datos.", 200, data, res);
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
        msj("Datos erroneos.", 200, validacion.array(), res);
    } else {
        const { id } = req.query;
        if (!id) {
            res.send("Debe enviar el id del libro.");
        } else {
            const searchLibro = await Libro.findOne({
                where: {
                    id: id,
                }
            });
            if (!searchLibro) {
                res.send("El libro no existe.");
            } else {
                try {
                    await Libro.destroy({
                        where: {
                            id: id,
                        }
                    }).then((data) => {
                        msj("Datos procesados correctamente.", 200, data, res);
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

exports.Update = async(req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        msj("Datos erroneos.", 200, validacion.array(), res);
    } else {
        const { id } = req.query;
        const { nombre, num_paginas, descripcion, archivo, portada, autorid, editorial } = req.body;
        console.log(nombre, num_paginas, descripcion, archivo, portada, autorid, editorial);
        if (!id) {
            msj("Datos incompletos.", 200, data, res);
        } else {
            var searchLibro = await Libro.findOne({
                where: {
                    id: id,
                }
            });
            if (!searchLibro) {
                msj("Datos inexistentes.", 200, data, res);
            } else {
                try {
                    if (!nombre || !num_paginas || !descripcion || !archivo || !portada || !autorid) {
                        msj("Datos incompletos.", 200, data, res);
                    } else {
                        searchLibro.nombre_libro = nombre;
                        searchLibro.num_paginas = num_paginas;
                        searchLibro.descripcion = descripcion;
                        searchLibro.libro = archivo;
                        searchLibro.img_libro = portada;
                        searchLibro.idautores = autorid;
                        searchLibro.editorial = editorial;
                        await searchLibro.save();
                        msj("Datos procesados correctamente.", 200, data, res);
                    }
                } catch (error) {
                    msj("ERROR", 500, error, res);
                }
            }
        }
    }
};