const createPedido = (req, res) => {
  const { id_cliente, estado_pedido, metodo_pago, monto_final, items } = req.body;
  db.query(
    `INSERT INTO pedidos (id_cliente, estado_pedido, metodo_pago, monto_final) VALUES (?, ?, ?, ?);`,
    [id_cliente, estado_pedido, JSON.stringify(metodo_pago), monto_final],
    (err, result) => {
      if (!err) {
        const id_pedido = result.insertId;
        items.forEach((item) => {
          const { id_producto, cantidad_item } = item;
          const sql_check_stock = "UPDATE productos SET cantidad_disponible = cantidad_disponible - ? WHERE id_producto = ? AND cantidad_disponible >= ?"
          db.query(sql_check_stock, [cantidad_item, id_producto, cantidad_item], async (err, resStock) => {
            if (!err) {
              try {
                const precio_item = await getPrecioProducto(id_producto);
                const subtotal_item = precio_item * cantidad_item;
                console.log("subtotal_item", subtotal_item)
                const sql_add_item = `INSERT INTO items_pedidos (id_pedido, id_producto, cantidad_item, subtotal_item) VALUES (?, ?, ?, ?)`
                const values = [id_pedido, id_producto, cantidad_item, subtotal_item]
                db.query(sql_add_item, values, (err, resAddItem) => {
                  if (!err) {
                    const sql_add_monto_total = `UPDATE pedidos SET monto_final=monto_final + ? WHERE id_pedido=?`
                    const values = [subtotal_item, id_pedido]
                    db.query(sql_add_monto_total, values, (err, resAddMonto) => {
                      if (!err) {
                        res.status(200).json({ message: `Predido creado correctamente id ${id_pedido}` })
                      }
                      else {
                        res.status(500).json({ message: "Error al modificar el monto total" })
                      }
                    })
                  }
                  else {
                    res.status(500).json({ message: `error al añadir item ${id_producto}` })
                  }
                })
              } catch (err) {
                console.error(err);
              }
            }
            else {
              res.status(500).json({ message: "Error al verificar productos" })
            }
          })
        });
      } else {
        console.error(err);
        res.status(500).json({ message: "Error al crear pedido" });
      }
    }
  );
};





// 1 const asd = `INSERT INTO pedidos (id_cliente, estado_pedido, metodo_pago, monto_final) VALUES (?, ?, ?, ?);`,

// 2 const sql_check_stock = "UPDATE productos SET cantidad_disponible = cantidad_disponible - ? WHERE id_producto = ? AND cantidad_disponible >= ?"


function update_stock(id_producto, cantidad_items){
  return new Promise((resolve, reject)=>{
    
    const sql_update_stock = "UPDATE productos SET cantidad_disponible = cantidad_disponible - ? WHERE id_producto = ? AND cantidad_disponible >= ?"
    const values = [cantidad_items, id_producto, cantidad_items]
    db.query(sql_update_stock, values, (err, res)=>{
      if(err){
        return reject(err)
      }
      resolve()
    })
  })
}


// 3 const precio_item = await getPrecioProducto(id_producto);

const sql_add_item = `INSERT INTO items_pedidos (id_pedido, id_producto, cantidad_item, subtotal_item) VALUES (?, ?, ?, ?)`

const sql_add_monto_total = `UPDATE pedidos SET monto_final=monto_final + ? WHERE id_pedido=?`
