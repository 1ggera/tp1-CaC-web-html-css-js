
// Crear un nuevo pedido y sus items
const createPedido = (req, res) => {
    const { id_cliente, estado_pedido, metodo_pago, monto_final, items } = req.body;
    
    db.beginTransaction(err => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error al iniciar la transacción" });
        }

        // Insertar el pedido
        db.query(
            "INSERT INTO pedidos (id_cliente, estado_pedido, metodo_pago, monto_final) VALUES (?, ?, ?, ?)",
            [id_cliente, estado_pedido, JSON.stringify(metodo_pago), monto_final],
            (err, result) => {
                if (err) {
                    return db.rollback(() => {
                        console.error(err);
                        res.status(500).json({ message: "Error al crear pedido" });
                    });
                }

                const pedidoId = result.insertId;

                // Insertar items del pedido
                const itemPromises = items.map(item => {
                    const { id_producto, cantidad_item, subtotal_item } = item;
                    return new Promise((resolve, reject) => {
                        db.query(
                            "INSERT INTO items_pedidos (id_pedido, id_producto, cantidad_item, subtotal_item) VALUES (?, ?, ?, ?)",
                            [pedidoId, id_producto, cantidad_item, subtotal_item],
                            (err, result) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(result);
                                }
                            }
                        );
                    });
                });

                Promise.all(itemPromises)
                    .then(() => {
                        db.commit(err => {
                            if (err) {
                                return db.rollback(() => {
                                    console.error(err);
                                    res.status(500).json({ message: "Error al confirmar la transacción" });
                                });
                            }

                            res.status(201).json({
                                message: "Pedido y items creados correctamente",
                                id: pedidoId
                            });
                        });
                    })
                    .catch(err => {
                        db.rollback(() => {
                            console.error(err);
                            res.status(500).json({ message: "Error al crear items de pedido" });
                        });
                    });
            }
        );
    });
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