const express = require('express');
const router = express.Router();
const usuarioController = require('../Controller/controllerUser');

router.get('/usuarios', usuarioController.listUsuarios);
router.post('/usuarios', usuarioController.createUsuario);
router.put('/usuarios/:idUsuario', usuarioController.updateUsuario);

module.exports = router;