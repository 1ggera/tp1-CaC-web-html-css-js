const express = require("express");
const router = express.Router();
const db = require("../db/db");

router.get("/", (req, res)=>{
  const sql = "SELECT * FROM consultas";
  db.query(sql, (err, results) =>{
    if(err){
      return res.status(500).send(err);
    }
    res.send(results);
  });
});

//Debe tener el mismo nombre en la ruta, variable y en la query
router.get("/:idProducto",(req, res)=>{
  const { idProducto } = req.params;
  const sql = "SELECT * FROM consultas WHERE id_producto = ?";
  db.query(sql, [idProducto], (err, result) => {
    if(err){
      return res.status(500).send("Error en la consulta de este producto");
    }
    if(result.length > 0){
      return res.status(200).send(result)
    }
    return res.status(404).send("Este producto aún no tiene consultas")
  })
})

router.post("/",(req, res)=>{
  const {nombre, apellido, email, id_producto} = req.body;

  const productoExistente = "SELECT 1 FROM productos WHERE id_producto = ?";

  const sql = "INSERT INTO consultas (nombre, apellido, email, id_producto) VALUES (?,?,?,?)";
  
  db.query(productoExistente, [id_producto], (err, result) =>{
    if (err) {
      return res.status(500).send(err);
    }
    if(result.length === 0){
      return res.status(404).send(`El número de producto "${id_producto}" no está en el listado`)
    }
    db.query(sql, [nombre, apellido, email, id_producto], (err, result)=>{
      if(err){
        return res.status(500).send(err);
      }
      res.status(200).send({
        id_consulta: result.insertId,
        nombre,
        apellido,
        email,
        id_producto,
      });
    });
  //   if (result.affectedRows > 0)
  //     res.status(200).send({
  //       id_consulta: result.insertId,
  //       nombre,
  //       apellido,
  //       email,
  //       id_producto,
  //     });
  //   return res.status(404).send(`El producto numero \"${id_producto}\" no está en la lista de productos`);
  });
});

module.exports = router