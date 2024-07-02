//config para levantar el servidor
const express = require("express");
const app = express();
const PORT = 3000;
const productsRouter = require("./routes/products");
const ventasRouter = require("./routes/ventas");
const categoriasRouter = require("./routes/categorias");
app.use(express.json()); // se recibirá un json


app.use("/products", productsRouter); // en la dirección products es donde voy a enviar un array de objetos
app.use("/ventas", ventasRouter);
app.use("/categorias", categoriasRouter);
app.listen(PORT, () => {
  console.log(`Corriendo en puerto ${PORT}`);
});
