const db = require("../config/database");


// extra_functions
// buscar precio del producto
function getProductPrice(id_producto) {
  return new Promise((resolve, reject) => {
    db.query("SELECT precio FROM productos WHERE id_producto = ?", [id_producto], (err, res) => {
      if (!err) {
        if (res.length > 0) {
          resolve(res[0].precio);
        }
        else {
          reject(new Error("Producto no encontrado"));
        }
      } else {
        reject(err);
      }
    })
  })
}
//obtener items de un pedido por id

// update_stock
function updateStock(id_producto, cantidad_items){
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

function insertPedido(id_cliente, estado_pedido, metodo_pago){
  return new Promise((resolve, reject)=>{
    console.log(metodo_pago);
    const sql_insert_pedido = "INSERT INTO pedidos (id_cliente, estado_pedido, metodo_pago) VALUES (?, ?, ?);"
    const values = [id_cliente, estado_pedido, JSON.stringify(metodo_pago)]
    db.query(sql_insert_pedido,values, (err, res)=>{
      if(err){
        return reject(err)
      }
      resolve(res)
    })
  })
}

function addItems (items){
  return new Promise((resolve, reject)=>{
    let subtotalAmmount = 0;
    for (const item of items){
      
      updateStock(item.id_producto, item.cantidad_item)
      //UPDATE productos SET cantidad_disponible = cantidad_disponible - ? WHERE id_producto = ? AND cantidad_disponible >= ?
        .then(()=>getProductPrice(item.id_producto))//ok 
        .then((product_price)=>addItem({...item, product_price}))//
        .then((subtotal)=>{subtotalAmmount+=subtotal})//
          .catch((error)=>resolve(new Error(error)));
    }
    resolve(subtotalAmmount)
  })
}
function addItem(item){
  return new Promise((resolve, reject)=>{
    const subtotalItem = item.product_price * item.cantidad_item
    const sqlAddItem = `INSERT INTO items_pedidos (id_pedido, id_producto, cantidad_item, subtotal_item) VALUES (?, ?, ?, ?)`
    db.query(sqlAddItem,[item.id_pedido, item.id_producto, item.cantidad_item, subtotal_item],(err)=>{
      if(err) reject(err)
      resolve(subtotalItem)
    })
  })
}

function updateTotalPrice(subtotal, idPedido){
  return new Promise((resolve, reject)=>{
    const sqlUpdateTotalPrice= `UPDATE pedidos SET monto_final= ? WHERE id_pedido=?`
    db.query(sqlUpdateTotalPrice,[subtotal, idPedido],(err)=>{
      if(err) reject(err)
      resolve()
    })
  })
}
const createPedido = (req, res)=>{
  const { id_cliente, estado_pedido, metodo_pago, items } = req.body;
  insertPedido(id_cliente, estado_pedido, metodo_pago)
    .then(({insertId})=>addItems(items))
    .then((totalPrice)=>updateTotalPrice(totalPrice,insertId))
    .then(()=>{
      res.status(200).json({message:`Pedido creado con éxito id:${insertId}`})
    }).catch((error)=>{
      res.status(500).json({error})
    })
  
  // 
  // espera a esta promesa<<< update_stock.then().then(paso)

}
function sumarMonto(sql_add_item, values) {
  return new Promise((resolve, reject) => {

    db.query(sql_add_monto_total, [subtotal_item, id_pedido], (err, resAddMonto) => {
      if (!err) {
        resolve()
      }
      else {
        res.status(500).json({ message: "Error al modificar el monto total" })
      }
    })
  })
}


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

const createPedido2 = (req, res) => {
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
  const sql = "UPDATE pedidos SET estado_pedido= 'cancelado' WHERE id_pedido = ?"
  db.query(
    sql, [id], (err, result) => {

      if (!err) {
        //devuelva al stock los items linkeado a id_pedido
        res.json({ message: "Pedido cancelado correctamente" });
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