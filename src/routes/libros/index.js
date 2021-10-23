const { Router } = require('express');
const { body } = require('express-validator');
const router = Router();
const libroController = require('../../controllers/librosController');

router.get('/listar', libroController.SelectAll);
router.post('/buscar', libroController.Search);
router.post('/',
    body('nombre_libro').isLength({ min: 2 }).withMessage('Longitud minima de caracteres: 2.'),
    body('num_paginas').isNumeric.withMessage('Campo numerico.'),
    libroController.Insert);
router.delete('/', libroController.Delete);
router.put('/', libroController.Update);
module.exports = router;