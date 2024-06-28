//Archivo q maneja las rutas de los productos
const express = require("express");
const router = express.Router();
const db = require("../db/db");

//1er endpoint
//visualizar todos los productos.
router.get("/", (req, res) => {
  const sql = "SELECT * FROM productos";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(results);
  });
});

//2do endpoint
// buscador de producto por nombre
router.get("/:nombre_producto", (req, res) => {
  const sql = "SELECT * FROM productos WHERE nombre_producto LIKE ?";
  const { nombre_producto } = req.params;
  db.query(sql, [`%${nombre_producto}%`], (err, result) => {
    // los campos completos
    if (err) {
      return res.status(500).send(err);
    }
    res.send(result);
  });
});

//3er endpoint en MÉTODO POST
//INSERT
router.post("/", (req, res) => {
  const {
    nombre_producto,
    precio_producto,
    descripcion_producto,
    id_categoria,
  } = req.body;
  console.log(req.body);
  const sql =
    "INSERT INTO productos (nombre_producto, precio_producto, descripcion_producto, id_categoria) VALUES (?, ?, ?, ?)";
  const values = [
    nombre_producto,
    precio_producto,
    descripcion_producto,
    id_categoria,
  ];
  db.query(sql, values, (err, result) => {
    // los campos completos
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send({
      id_producto: result.insertId,
      nombre_producto,
      precio_producto,
      descripcion_producto,
      id_categoria,
    });
  });
});

//4to ENDPOINT
//UPDATE
router.put("/:id", (req, res) => {
  console.log("asdasd");
  const {
    nombre_producto,
    precio_producto,
    descripcion_producto,
    id_categoria,
  } = req.body;
  const { id } = req.params;
  console.log(req.body);
  console.log(req.params);
  sql = `UPDATE productos SET                
                nombre_producto = ?,
                precio_producto = ?,
                descripcion_producto = ?,
                id_categoria = ?
         WHERE id_producto = ?`;
  const values = [
    nombre_producto,
    precio_producto,
    descripcion_producto,
    id_categoria,
    id,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).send("error al seleccionar ", err);
    }
    if (result.affectedRows > 0)
      res.status(201).send("Modificado correctamente");
    else res.status(200).send("Producto sin encontrar");
    //    nombre_producto,precio_producto,descripcion_producto,id_categoria,
  });
});

//5to ENDPOINT
//DELETE
router.delete("/:id", (req, res) => {
  // parsea el id q le ingresamos y lo busca en el listado
  const productIndex = products.findIndex(
    (prod) => prod.id === parseInt(req.params.id)
  );
  if (productIndex == -1) return res.status(404).send("Producto no encontrado");

  const deleteProduct = products.splice(productIndex, 1);

  res.json(deleteProduct); // cuando finaliza muestra la película eliminada
});

/**
app.post("/items", (req, res) => {
  const { nombre, descripcion } = req.body;
  const sql = "INSERT INTO items (nombre, descripcion) VALUES (?,?)";
  db.query(sql_, [nombre, descripcion], (err, result) => { // los campos completos
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send({ id: result.insertId, nombre, descripcion }); //todos los campos de la bd
  });
});
*/

module.exports = router;
