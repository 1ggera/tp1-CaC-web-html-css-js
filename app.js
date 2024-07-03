// app.js

const express = require('express');
const bodyParser = require('body-parser');
// const clienteRoutes = require('./routes/clienteRoutes');
const clienteRoutes = require('./apiv2/routes/clienteRoutes')
const pedidoRoutes = require('./apiv2/routes/pedidoRoutes');
const productoRoutes = require('./apiv2/routes/productoRoutes');
const usuarioRoutes = require('./apiv2/routes/usuarioRoutes');

const app = express();

// Middleware para parsear bodies JSON
app.use(bodyParser.json());

// Rutas
app.use('/clientes', clienteRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/productos', productoRoutes);
app.use('/usuarios', usuarioRoutes);

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});