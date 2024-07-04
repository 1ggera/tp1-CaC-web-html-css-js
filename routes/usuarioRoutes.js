const express = require('express');
const router = express.Router();
const {
    getAllUsuarios,
    getUsuarioByUsername,
    createUsuario,
    updateUsuario,
    deleteUsuario
} = require('../controllers/usuarioController');

// Rutas para usuarios
router.get('/', getAllUsuarios);
router.get('/:username', getUsuarioByUsername);
router.post('/', createUsuario);
router.put('/:username', updateUsuario);
router.delete('/:username', deleteUsuario);

module.exports = router;