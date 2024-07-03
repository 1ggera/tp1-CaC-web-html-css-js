const express = require('express');
const {
    getAllClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente
} = require('../controllers/clienteController');
const { getAllProductos } = require('../controllers/productoController');

const router = express.Router();


router.get('/', getAllClientes);
router.get('/:id', getClienteById);
router.post('/', createCliente);
router.put('/', updateCliente);
router.delete('/', deleteCliente);

module.exports = router;
