//config para levantar el servidor
const express = require('express')
const app = express()
//const PORT = 3000
const productsRouter = require('./routes/products')

app.use(express.json()) // se recibirá un json

app.use('/products', productsRouter)  // en la dirección products es donde voy a enviar un array de objetos

/*
app.listen(PORT, () => {
  console.log(`Corriendo en puerto ${PORT}`);
})
*/