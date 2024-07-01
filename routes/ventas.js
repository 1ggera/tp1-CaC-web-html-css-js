//Archivo q maneja las rutas de los productos
const express = require("express");
const router = express.Router();
const db = require("../db/db");

// Ver todas las ventas
router.get("/", (req, res) => {
  const sql = "SELECT * FROM ventas";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(results);
  });
});
//Filtrar ventas por dni
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

// se efectua una venta
router.post("/", (req, res) => {
  const { dni, fecha_nac, nombre, apellido, id_producto } = req.body;
  sql =
    "INSERT INTO ventas (dni, fecha_nac, nombre, apellido, id_producto) SELECT ?,?,?,?,? FROM dual WHERE EXISTS (SELECT 1 FROM productos WHERE id_producto = ? );";
  values = [dni, fecha_nac, nombre, apellido, id_producto, id_producto];
  console.log(req.body);
  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows > 0)
      res.status(200).send({
        id_venta: result.insertId,
        dni,
        fecha_nac,
        nombre,
        apellido,
        id_producto,
      });
    else return res.status(201).send("id producto no encontrado ", err);
  });
});

module.exports = router;
