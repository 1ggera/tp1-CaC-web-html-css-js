const express = require('express');
const {
    getAllProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto
} = require('../controllers/productoController');
console.log("Producto iniciado");
const router = express.Router();

router.get('/', getAllProductos);
router.get('/:id', getProductoById);
router.post('/', createProducto);
router.put('/:id', updateProducto);
router.delete('/:id', deleteProducto);

module.exports = router;