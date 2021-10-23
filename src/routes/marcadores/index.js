const { Router } = require('express');
const { body } = require('express-validator');
const router = Router();
const marcadorController = require('../../controllers/marcadoresController');

router.get('/', marcadorController.SelectAll);
router.get('/buscar', marcadorController.CheckBook);
router.post('/', marcadorController.Insert);
router.delete('/', marcadorController.Delete);
module.exports = router;