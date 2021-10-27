const Autores = require('../models/autoresModel');
const msj = require('../components/message');
const { Op } = require("sequelize");
const { validationResult } = require('express-validator');
exports.Listar = async(req, res) => {
    try {
        const autores = await Autores.findAll();
        msj("Proceso Exitoso.", 200, autores, res);
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
            const { nombreautor } = req.query;
            const filter = '%' + nombreautor + '%';
            const autores = await Autores.findAll({
                where: {
                    nombre_autor: {
                        [Op.like]: filter,
                    },
                }
            });
            msj("Proceso Exitoso.", 200, autores, res);
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
        const { nombreautor } = req.body;
        console.log(nombreautor);
        if (!nombreautor) {
            msj("Datos incompletos.", 200, validacion.array(), res);
        } else {
            try {
                const nuevoAutor = Autores.create({
                    nombre_autor: nombreautor
                }).then((data) => {
                    msj("Registro almacenado correctamente", 200, data, res);
                }).catch((error) => {
                    msj("Error al guardar los datos.", 200, error, res);
                });
            } catch (error) {
                msj("ERROR", 500, error, res);
                console.log(error);
            }
        }
    }
};

exports.Eliminar = async(req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        msj("Datos erroneos.", 200, validacion.array(), res);
    } else {
        const { id } = req.query;
        if (!id) {
            msj("No se envio el codigo del autor.", 200, validacion.array(), res);
        } else {
            const buscarautores = await Autores.findOne({
                where: {
                    idautores: id,
                }
            });
            if (!buscarautores) {
                msj("Autor inexistente.", 200, buscarautores, res);
            } else {
                try {
                    await Autores.destroy({
                        where: {
                            idautores: id,
                        }
                    }).then((data) => {
                        msj("Registro eliminado exitosamente", 200, data, res);
                    }).catch((error) => {
                        msj("Registro no eliminado.", 200, error, res);
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
        const { nombreautor } = req.body;
        console.log(nombreautor);
        if (!idautores) {
            msj("Datos incompletos.", 200, data, res);
        } else {
            var buscarautores = await Autores.findOne({
                where: {
                    idautores: idautores,
                }
            });
            if (!buscarautores) {
                msj("Datos inexistentes.", 200, buscarautores, res);
            } else {
                try {
                    if (!nombreautor) {
                        msj("Datos incompletos.", 200, buscarautores, res);
                    } else {
                        buscarautores.nombre_autor = nombreautor;
                        await buscarautores.save();
                        msj("Datos procesados correctamente.", 200, buscarautores, res);
                    }
                } catch (error) {
                    msj("ERROR", 500, error, res);
                }
            }
        }
    }
};