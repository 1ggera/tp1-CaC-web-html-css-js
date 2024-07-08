const express = require('express')
const {
    getAllPedidos,
    getPedidoById,
    createPedido,
    updatePedido,
    deletePedido, } = require('../controllers/pedidoController');

const router = express.Router();

router.get('/', getAllPedidos);
router.get('/:id', getPedidoById);
router.post('/', createPedido);
router.put('/', updatePedido);
router.delete('/:id', deletePedido);


module.exports = router;