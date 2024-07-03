// controllers/productoController.js

const db = require("../config/database");
console.log("productoController");
// Obtener todos los productos
const getAllProductos = (req, res) => {
    console.log("getAllProductos");
    db.query("SELECT * FROM productos", (err, rows) => {
        if (!err) {
            console.log("getAllProductos sin errores");
            return res.json(rows);
        } else {
            console.error(err);
            return res.status(500).json({ message: "Error al obtener productos" });
        }
    });
};

// Obtener un producto por ID
const getProductoById = (req, res) => {
    const { id } = req.params;
    console.log("getProductoById")
    db.query(
        "SELECT * FROM productos WHERE id_producto = ?",
        [id],
        (err, rows) => {
            if (!err) {
                console.log("getProductoById sin error");
                if (rows.length > 0) {
                    return res.json(rows[0]);
                } else {
                    return res.status(404).json({ message: "Producto no encontrado" });
                }
            } else {
                console.error(err);
                return res.status(500).json({ message: "Error al obtener producto por ID" });
            }
        }
    );
};

// Crear un nuevo producto
const createProducto = (req, res) => {
    const { nombre_producto, descripcion_producto, cantidad_disponible } =
        req.body;
    db.query(
        "INSERT INTO productos (nombre_producto, descripcion_producto, cantidad_disponible) VALUES (?, ?, ?)",
        [nombre_producto, descripcion_producto, cantidad_disponible],
        (err, result) => {
            // if (!err) {
            //     return res.status(201).json({
            //         message: "Producto creado correctamente",
            //         id: result.insertId,
            //     });
            // } else {
            //     console.error(err);
            //     return res.status(500).json({ message: "Error al crear producto" });
            // }
            if (err){
                return res.status(500).json({message: "Error al crear producto"})
            }
            console.log("insertado ok");
            return res.status(201).json({
                message: "Producto creado correctamente",
                id: result.insertId,
            }); 
        }
    );
};

// Actualizar un producto por ID
const updateProducto = (req, res) => {
    const { id } = req.params;
    const { nombre_producto, descripcion_producto, cantidad_disponible } =
        req.body;
    db.query(
        "UPDATE productos SET nombre_producto = ?, descripcion_producto = ?, cantidad_disponible = ? WHERE id_producto = ?",
        [nombre_producto, descripcion_producto, cantidad_disponible, id],
        (err, result) => {
            if (!err) {
                return res.json({ message: "Producto actualizado correctamente" });
            } else {
                console.error(err);
                return res.status(500).json({ message: "Error al actualizar producto" });
            }
        }
    );
};

// Eliminar un producto por ID
const deleteProducto = (req, res) => {
    const { id } = req.params;
    db.query(
        "DELETE FROM productos WHERE id_producto = ?",
        [id],
        (err, result) => {
            if (!err) {
                return res.json({ message: "Producto eliminado correctamente" });
            } else {
                console.error(err);
                return res.status(500).json({ message: "Error al eliminar producto" });
            }
        }
    );
};
module.exports = {
    getAllProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto,
};
