const { Router } = require('express');
const { body } = require('express-validator');
const passportController = require('../../controllers/passportController');
const router = Router();
const libroController = require('../../controllers/librosController');

router.get('/lista', passportController.validarAutenticado, libroController.SelectAll);
router.post('/buscar', passportController.validarAutenticado, libroController.Search);
router.post('/guardar', passportController.validarAutenticado,
    body('nombre_libro').isLength({ min: 2 }).withMessage('Longitud minima de caracteres: 2.'),
    body('num_paginas').isNumeric().withMessage('Campo numerico.'),
    libroController.Insert);
router.delete('/eliminar', passportController.validarAutenticado, libroController.Delete);
router.put('/actualizar', passportController.validarAutenticado, libroController.Update);
module.exports = router;