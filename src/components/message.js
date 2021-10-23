const message = (msj, estado, data, res) => {
    var messages = {
        msj: msj,
        data: data
    };
    res.setHeader("Content-Type", "application/json");
    res.statusCode = estado;
    res.json(mensaje);
};
module.exports = message;