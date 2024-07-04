// app.js

const express = require('express');
const bodyParser = require('body-parser');
const clienteRoutes = require('./routes/clienteRoutes')
const pedidoRoutes = require('./routes/pedidoRoutes');
const productoRoutes = require('./routes/productoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const itemsPedidosRoutes = require('./routes/itemsPedidosRoutes');
const app = express();

// Middleware para parsear bodies JSON
app.use(bodyParser.json());

// Rutas
app.use('/clientes', clienteRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/productos', productoRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/items', itemsPedidosRoutes);

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});