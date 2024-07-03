const express = require('express');
const router = express.Router();
const {
    getAllItemsPedido,
    getItemsPedidoByPedidoId,
    createItemPedido,
    updateItemPedido,
    deleteItemPedido
} = require('../controllers/itemsPedidoController');

// Rutas para items de pedidos
router.get('/', getAllItemsPedido);
router.get('/pedido/:id_pedido', getItemsPedidoByPedidoId);
router.post('/', createItemPedido);
router.put('/:id', updateItemPedido);
router.delete('/:id', deleteItemPedido);

module.exports = router;
