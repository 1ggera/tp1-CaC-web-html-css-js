//Archivo q maneja las rutas de los productos
const express = require("express");
const router = express.Router();
const db = require("../db/db");

/**
 * Ver todas las ventas sin importar el estado_pedido
 */
router.get("/", (req, res) => {
  const sql = "SELECT * FROM ventas";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(results);
  });
});

/**
 * Ver todas las ventas aceptadas
 */
router.get("/accept", (req, res) => {
  const sql = "SELECT * FROM ventas WHERE estado_pedido = 'aceptado'";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(results);
  });
});

/**
 * Listar todas las compras/ventas de un cliente
 */
router.get("/:dni", (req, res) => {
  const { dni } = req.params;
  const sql = "SELECT * FROM ventas WHERE dni = ?";
  db.query(sql, [dni], (err, result) => {
    if (err) {
      return res.status(500).send("Error en el servidor");
    }
    if (result.length > 0) return res.status(200).send(result);
    return res.status(404).send("Este dni no tiene una compra asociada");
  });
});

/**
 * Subir una venta en la tabla
 * Por defecto se sube el estado del pedido en "espera" hasta esperar confirmación.
 * Luego por medio de otro endpoint se puede modificar según el id_venta
 */
router.post("/", (req, res) => {
  const { dni, fecha_nac, nombre, apellido, id_producto, medio_pago} = req.body;
  sql =
    "INSERT INTO ventas (dni, fecha_nac, nombre, apellido, id_producto,medio_pago,estado_pedido ) SELECT ?,?,?,?,?,?,? FROM dual WHERE EXISTS (SELECT 1 FROM productos WHERE id_producto = ? );";
  values = [dni, fecha_nac, nombre, apellido, id_producto,medio_pago,"espera", id_producto];
  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.affectedRows > 0)
      res.status(200).send({
        id_venta: result.insertId,
        dni,
        fecha_nac,
        nombre,
        apellido,
        id_producto,
      });
    return res.status(404).send(`El id \"${id_producto}\" no existe en la base de datos`);
  });
});

/**
 * Modificar el estado de una venta
 */
router.put("/:id_venta/:estado",(req,res)=>{
  const {id_venta, estado} = req.params
  sql = "UPDATE ventas SET estado_pedido = ? WHERE id_venta = ?"
  values= [estado, id_venta]
  db.query(sql, values , (err, result)=>{
    if(err){
      return res.status(500).send(err)
    }
    console.log(result.affectedRows)
    if(result.affectedRows>0){
      return res.status(200).send("Modificado correctamente")
    }
    return res.status(404).send(`El id \"${id_venta}\" no existe`)
  })
})

router.delete("/:id_venta", (req,res)=>{
  const { id_venta } = req.params
  sql = "DELETE FROM ventas WHERE id_venta = ?"
  values = [id_venta]
  db.query(sql, values, (err, result)=>{
    if(err) return res.status(500).send(err)
    if(result.affectedRows>0) return res.status(200).send("Eliminado correctamente")
    return res.status(404).send(`El id:\"${id_venta}\" no existe`)
  })
})


module.exports = router;
