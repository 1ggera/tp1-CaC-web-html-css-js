const db = require("../config/database");

// Obtener todos los usuarios
const getAllUsuarios = (req, res) => {
    db.query("SELECT * FROM usuarios", (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.error(err);
            res.status(500).json({ message: "Error al obtener usuarios" });
        }
    });
};

// Obtener un usuario por username
const getUsuarioByUsername = (req, res) => {
    const { username } = req.params;
    db.query(
        "SELECT * FROM usuarios WHERE username = ?",
        [username],
        (err, rows) => {
            if (!err) {
                if (rows.length > 0) {
                    res.json(rows[0]);
                } else {
                    res.status(404).json({ message: "Usuario no encontrado" });
                }
            } else {
                console.error(err);
                res.status(500).json({ message: "Error al obtener usuario por username" });
            }
        }
    );
};

// Crear un nuevo usuario
const createUsuario = (req, res) => {
    const { username, password, tipo_usuario } = req.body;
    db.query(
        "INSERT INTO usuarios (username, password, tipo_usuario) VALUES (?, ?, ?)",
        [username, password, tipo_usuario || 'guest'],
        (err, result) => {
            if (!err) {
                res.status(201).json({
                    message: "Usuario creado correctamente",
                    username: username,
                });
            } else {
                console.error(err);
                res.status(500).json({ message: "Error al crear usuario" });
            }
        }
    );
};

// Actualizar un usuario por username
const updateUsuario = (req, res) => {
    const { username } = req.params;
    const { password, tipo_usuario } = req.body;
    db.query(
        "UPDATE usuarios SET password = ?, tipo_usuario = ? WHERE username = ?",
        [password, tipo_usuario || 'guest', username],
        (err, result) => {
            if (!err) {
                res.json({ message: "Usuario actualizado correctamente" });
            } else {
                console.error(err);
                res.status(500).json({ message: "Error al actualizar usuario" });
            }
        }
    );
};

// Eliminar un usuario por username
const deleteUsuario = (req, res) => {
    const { username } = req.params;
    db.query(
        "DELETE FROM usuarios WHERE username = ?",
        [username],
        (err, result) => {
            if (!err) {
                res.json({ message: "Usuario eliminado correctamente" });
            } else {
                console.error(err);
                res.status(500).json({ message: "Error al eliminar usuario" });
            }
        }
    );
};


module.exports = {
    getAllUsuarios,
    getUsuarioByUsername,
    createUsuario,
    updateUsuario,
    deleteUsuario,
};