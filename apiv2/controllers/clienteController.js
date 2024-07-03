// controllers/clienteController.js

const db = require('../config/database');

// Obtener todos los clientes
const getAllClientes = (req, res) => {
    db.query('SELECT * FROM cliente', (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.error(err);
            res.status(500).json({ message: 'Error al obtener clientes' });
        }
    });
};

// Obtener un cliente por ID
const getClienteById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM cliente WHERE id_cliente = ?', [id], (err, rows) => {
        if (!err) {
            if (rows.length > 0) {
                res.json(rows[0]);
            } else {
                res.status(404).json({ message: 'Cliente no encontrado' });
            }
        } else {
            console.error(err);
            res.status(500).json({ message: 'Error al obtener cliente por ID' });
        }
    });
};

// Crear un nuevo cliente
const createCliente = (req, res) => {
    const { nombre, direccion, telefono } = req.body;
    db.query('INSERT INTO cliente (nombre, direccion, telefono) VALUES (?, ?, ?)', [nombre, direccion, telefono], (err, result) => {
        if (!err) {
            res.status(201).json({ message: 'Cliente creado correctamente', id: result.insertId });
        } else {
            console.error(err);
            res.status(500).json({ message: 'Error al crear cliente' });
        }
    });
};

// Actualizar un cliente por ID
const updateCliente = (req, res) => {
    const { id } = req.params;
    const { nombre, direccion, telefono } = req.body;
    db.query('UPDATE cliente SET nombre = ?, direccion = ?, telefono = ? WHERE id_cliente = ?', [nombre, direccion, telefono, id], (err, result) => {
        if (!err) {
            res.json({ message: 'Cliente actualizado correctamente' });
        } else {
            console.error(err);
            res.status(500).json({ message: 'Error al actualizar cliente' });
        }
    });
};

// Eliminar un cliente por ID
const deleteCliente = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM cliente WHERE id_cliente = ?', [id], (err, result) => {
        if (!err) {
            res.json({ message: 'Cliente eliminado correctamente' });
        } else {
            console.error(err);
            res.status(500).json({ message: 'Error al eliminar cliente' });
        }
    });
};

module.exports = {
    getAllClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente
};
