const GeneroL = require('');
const msj = require('../components/message');
const { Op } = require("sequelize");
exports.SelectAll = async(req, res) => {
    try {
        const GeneroL = await GeneroL.findAll();
    } catch (error) {
        msj("ERROR", 500, error, res);
    }

};
exports.Insert = (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        msj("Datos erroneos.", 200, validacion.array(), res);
    } else {
        const { genero } = req.body;
        console.log(genero);
        if (!genero) {
            res.send("Faltan datos requeridos.");
        } else {
            try {
                const nuevoGeneroL = GeneroL.create({
                    generos_literarios: genero,
                }).then((data) => {
                    msj("Datos procesados correctamente.", 200, data, res);
                }).catch((data) => {
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
                res.send("El GeneroL no existe.");
            } else {
                try {
                    await GeneroL.destroy({
                        where: {
                            idgl: idgl,
                        }
                    }).then((data) => {
                        msj("Datos procesados correctamente.", 200, data, res);
                    }).catch((data) => {
                        msj("Error al procesar los datos.", 500, data, res);
                    });
                } catch (error) {
                    msj("ERROR", 500, error, res);
                }
            }
        }
    }
};