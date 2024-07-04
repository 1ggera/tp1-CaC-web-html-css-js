const mysql = require("mysql2");

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tecnifull",
});

conexion.connect((err) => {
    if (err) {
        console.log("Falló la conexión", err);
        return;
    }
    console.log("Conexión exitosa!");
});

module.exports = conexion;