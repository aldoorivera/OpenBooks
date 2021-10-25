const Libro = require('../models/autoresModel');
const msj = require('../components/message');
const { Op } = require("sequelize");
const { validationResult } = require('express-validator');
exports.Listar = async(req, res) => {
    try {
        const Autores = await Autores.findAll();
    } catch (error) {
        msj("ERROR", 500, error, res);
    }

};
exports.Buscar = async(req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        msj("Datos erroneos.", 200, validacion.array(), res);
    } else {
        try {
            const filter = '%' + req.body.nombre_libro + '%';
            const Autores = await Autores.findAll({
                where: {
                    nombre_autor: {
                        [Op.like]: filter,
                    },
                }
            });
        } catch (error) {
            msj("ERROR", 500, error, res);
        }
    }
};

exports.GuardarAutores = (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        msj("Datos erroneos.", 200, validacion.array(), res);
    } else {
        const { nombre_autor } = req.body;
        console.log(nombre_autor);
        if (!nombre_autor ) {
            res.send("Debe enviar los datos completos.");
        } else {
            try {
                const nuevoAutor = Autor.create({
                    nombre_autor: nombre_autor
                }).then((data) => {
                    msj("Registro almacenado correctamente", 200, data, res);
                }).catch((error) => {
                    msj("Error al guardar los datos.", 200, data, res);
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
        msj("Datos erroneos.", 200, validacion.array(), res);
    } else {
        const { idautores } = req.query;
        if (!idautores) {
            res.send("Debe enviar el id del autor.");
        } else {
            const buscarautores = await Autor.findOne({
                where: {
                    idautores: idautores,
                }
            });
            if (!buscarautores) {
                res.send("El autor no existe.");
            } else {
                try {
                    await Autor.destroy({
                        where: {
                            id: id,
                        }
                    }).then((data) => {
                        msj("Registro eliminado exitosamente", 200, data, res);
                    }).catch((error) => {
                        msj("Registro no eliminado.", 200, data, res);
                    });
                } catch (error) {
                    msj("ERROR", 500, error, res);
                }
            }
        }
    }
};

exports.Actualizar = async(req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        msj("Datos erroneos.", 200, validacion.array(), res);
    } else {
        const { idautores } = req.query;
        const { nombre_autor } = req.body;
        console.log(nombre_autor);
        if (!idautores) {
            msj("Datos incompletos.", 200, data, res);
        } else {
            var buscarautores = await Libro.findOne({
                where: {
                    idautores: idautores,
                }
            });
            if (!buscarautores) {
                msj("Datos inexistentes.", 200, data, res);
            } else {
                try {
                    if (!nombre_autor) {
                        msj("Datos incompletos.", 200, data, res);
                    } else {
                        buscarautores.nombre_autor=nombre_autor;
                        await buscarautores.save();
                        msj("Datos procesados correctamente.", 200, data, res);
                    }
                } catch (error) {
                    msj("ERROR", 500, error, res);
                }
            }
        }
    }
};