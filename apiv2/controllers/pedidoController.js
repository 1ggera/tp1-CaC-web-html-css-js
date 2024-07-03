const db = require("../config/database");

// Obtener todos los pedidos
const getAllPedidos = (req, res) => {
    db.query("SELECT * FROM pedidos", (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.error(err);
            res.status(500).json({ message: "Error al obtener pedidos" });
        }
    });
};

// Obtener un pedido por ID
const getPedidoById = (req, res) => {
    const { id } = req.params;
    db.query(
        "SELECT * FROM pedidos WHERE id_pedido = ?",
        [id],
        (err, rows) => {
            if (!err) {
                if (rows.length > 0) {
                    res.json(rows[0]);
                } else {
                    res.status(404).json({ message: "Pedido no encontrado" });
                }
            } else {
                console.error(err);
                res.status(500).json({ message: "Error al obtener pedido por ID" });
            }
        }
    );
};

// Crear un nuevo pedido
const createPedido = (req, res) => {
    const { id_cliente, estado_pedido, metodo_pago, monto_final } = req.body;
    db.query(
        "INSERT INTO pedidos (id_cliente, estado_pedido, metodo_pago, monto_final) VALUES (?, ?, ?, ?)",
        [id_cliente, estado_pedido, JSON.stringify(metodo_pago), monto_final],
        (err, result) => {
            if (!err) {
                res.status(201).json({
                    message: "Pedido creado correctamente",
                    id: result.insertId,
                });
            } else {
                console.error(err);
                res.status(500).json({ message: "Error al crear pedido" });
            }
        }
    );
};

// Actualizar un pedido por ID
const updatePedido = (req, res) => {
    const { id } = req.params;
    const { estado_pedido, metodo_pago, monto_final } = req.body;
    db.query(
        "UPDATE pedidos SET estado_pedido = ?, metodo_pago = ?, monto_final = ? WHERE id_pedido = ?",
        [estado_pedido, JSON.stringify(metodo_pago), monto_final, id],
        (err, result) => {
            if (!err) {
                res.json({ message: "Pedido actualizado correctamente" });
            } else {
                console.error(err);
                res.status(500).json({ message: "Error al actualizar pedido" });
            }
        }
    );
};

// Eliminar un pedido por ID
const deletePedido = (req, res) => {
    const { id } = req.params;
    db.query(
        "DELETE FROM pedidos WHERE id_pedido = ?",
        [id],
        (err, result) => {
            if (!err) {
                res.json({ message: "Pedido eliminado correctamente" });
            } else {
                console.error(err);
                res.status(500).json({ message: "Error al eliminar pedido" });
            }
        }
    );
};

module.exports = {
    getAllPedidos,
    getPedidoById,
    createPedido,
    updatePedido,
    deletePedido,
};