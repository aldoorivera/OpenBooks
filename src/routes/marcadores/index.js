const { Router } = require('express');
const { body } = require('express-validator');
const passportController = require('../../controllers/passportController');
const router = Router();
const marcadorController = require('../../controllers/marcadoresController');

router.post('/listar', passportController.validarAutenticado, marcadorController.SelectAll);
router.post('/buscar', passportController.validarAutenticado, marcadorController.CheckBook);
router.post('/guardar', passportController.validarAutenticado, marcadorController.Insert);
router.delete('/eliminar', passportController.validarAutenticado, marcadorController.Delete);
module.exports = router;