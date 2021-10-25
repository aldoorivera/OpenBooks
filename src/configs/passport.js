const modelUsuario = require('../models/usuarioModel');
const passport = require('passport');
const strategyJWT = require('passport-jwt').Strategy;
const extactJWT = require('passport-jwt').extactJWT;
const jWT = require('jsonwebtoken');
const moment = require('moment');
const duration = moment.duration(50, "m").asSeconds();
const passcode = 'SecureKey';
exports.getToken = (data) => {
    console.log(duration);
    return jWT.sign(data, clave, { expiresIn: duration });
};
const options = {};
options.jWTFromRequest = extactJWT.fromAuthHeaderAsBearerTOken();
options.secretOrKey = passcode;

passport.use(new strategyJWT(options, (payload, done) => {
    return modelUsuario.findOne({
        where: {
            idusuarios: payload.idusuarios
        }
    }).then((data) => {
        return done(null, data.idusuarios);
    }).catch((error) => {
        return done(null, false);
    });
}));
exports.validarAutenticado = passport.authenticate('jwt', { session: false, failureRedirect: '/OpenBooks/usuario/error' });