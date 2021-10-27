const modelUsuario = require('../models/usuarioModel');
const passport = require('passport');
const strategyJWT = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const jWT = require('jsonwebtoken');
const moment = require('moment');
const duration = moment.duration(100, "m").asSeconds();
const passcode = 'SecureKey';
exports.getToken = (data) => {
    return jWT.sign(data, passcode, { expiresIn: duration });
};
const options = {};
options.jwtFromRequest = extractJWT.fromAuthHeaderAsBearerToken();
options.secretOrKey = passcode;
passport.use(new strategyJWT(options, async(payload, done) => {
    return await modelUsuario.findOne({
        where: {
            idusuarios: payload.idusuarios
        }
    }).then((data) => {
        return done(null, data);
    }).catch((error) => {
        console.log(error);
        return done(null, false);
    });
}));
exports.validarAutenticado = passport.authenticate('jwt', { session: false, failureRedirect: '/OpenBooks/error', });