const db = require("../config/database");

// Obtener todos los items de un pedido
const getAllItemsPedido = (req, res) => {
    db.query("SELECT * FROM items_pedidos", (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.error(err);
            res.status(500).json({ message: "Error al obtener items de pedidos" });
        }
    });
};

// Obtener todos los items de un pedido por ID de pedido
const getItemsPedidoByPedidoId = (req, res) => {
    const { id_pedido } = req.params;
    db.query(
        "SELECT * FROM items_pedidos WHERE id_pedido = ?",
        [id_pedido],
        (err, rows) => {
            if (!err) {
                res.json(rows);
            } else {
                console.error(err);
                res.status(500).json({ message: "Error al obtener items de pedidos por ID de pedido" });
            }
        }
    );
};

// Crear un nuevo item de pedido
const createItemPedido = (req, res) => {
    const { id_pedido, id_producto, cantidad_item, subtotal_item } = req.body;
    db.query(
        "INSERT INTO items_pedidos (id_pedido, id_producto, cantidad_item, subtotal_item) VALUES (?, ?, ?, ?)",
        [id_pedido, id_producto, cantidad_item, subtotal_item],
        (err, result) => {
            if (!err) {
                res.status(201).json({
                    message: "Item de pedido creado correctamente",
                    id: result.insertId,
                });
            } else {
                console.error(err);
                res.status(500).json({ message: "Error al crear item de pedido" });
            }
        }
    );
};

// Actualizar un item de pedido por ID de item
const updateItemPedido = (req, res) => {
    const { id } = req.params;
    const { cantidad_item, subtotal_item } = req.body;
    db.query(
        "UPDATE items_pedidos SET cantidad_item = ?, subtotal_item = ? WHERE id_item = ?",
        [cantidad_item, subtotal_item, id],
        (err, result) => {
            if (!err) {
                res.json({ message: "Item de pedido actualizado correctamente" });
            } else {
                console.error(err);
                res.status(500).json({ message: "Error al actualizar item de pedido" });
            }
        }
    );
};

// Eliminar un item de pedido por ID de item
const deleteItemPedido = (req, res) => {
    const { id } = req.params;
    db.query(
        "DELETE FROM items_pedidos WHERE id_item = ?",
        [id],
        (err, result) => {
            if (!err) {
                res.json({ message: "Item de pedido eliminado correctamente" });
            } else {
                console.error(err);
                res.status(500).json({ message: "Error al eliminar item de pedido" });
            }
        }
    );
};

module.exports = {
    getAllItemsPedido,
    getItemsPedidoByPedidoId,
    createItemPedido,
    updateItemPedido,
    deleteItemPedido,
};
