//Archivo q maneja las rutas de los productos
const express = require('express')
const router = express.Router()

let products = [
  {
    id: 1,
    title: "Monitor SONY 24'",
    precio: 120000
  },
  {
    id: 2,
    title: "Memoria RAM DDR3 Soddimm 8GB Hiksemi ",
    precio: 15000
  },
  {
    id: 3,
    title: "Stream Deck ElGato 6 botones LCD ",
    precio: 60000
  },
  {
    id: 4,
    title: "Teclado Mecanico Redragon",
    precio: 50000
  },
  {
    id: 5,
    title: "Impresora HP Laserjet M111",
    precio: 140000
  },
  {
    id: 6,
    title: "Gamepad Redragon Harrow Pro Wireless",
    precio: 50000
  },
  {
    id: 7,
    title: "Auriculares Logitech H390 con micrófono",
    precio: 40000
  },
  {
    id: 8,
    title: "Placa de Red PCI Express Wifi TP-Link",
    precio: 20000
  },
  {
    id: 9,
    title: "Starlink Adaptador Ethernet Gen 2",
    precio: 55000
  },
  {
    id: 10,
    title: "Fuente de alimentación Sentey Solid Series F550w'",
    precio: 60000
  },
  {
    id: 11,
    title: "Fuente de alimentación 650w Sentey",
    precio: 65000
  },
  {
    id: 12,
    title: "Memoria RAM Kingston Fury Beast DDR4 Gamer 16gb",
    precio: 60000
  },
]

//1er endpoint
router.get('/',(req, res)=>{
  res.json(products)
})

//2do endpoint
// el id q le envíe por parámetro lo busca dentro del array de productos
router.get('/:id',(req, res)=>{
  // 'product' busca en products el id q coincida con el parámetro q le enviamos.
  // se parsea porq sino lo toma como un text
  const product = products.find(prod => prod.id === parseInt(req.params.id)) 
  // si el producto no se encuentra mostrará un error 404
  if(!product) return res.status(404).send('Producto no encontrado');
  // y si lo encuentra q lo muetre en pantalla
  res.json(product)
})

//3er endpoint en MÉTODO POST
//INSERT
router.post('/',(req, res)=>{
  const newProduct = {
    id: products.length + 1, // agrega el producto
    title: req.body.title,  // recibe el título
    precio: req.body.precio // recibe el precio
  }
  products.push(newProduct) // agrego el objeto nuevo al array de productos
  res.status(201).json(newProduct) // para q se muestre el producto nuevo en caso de q se agregue bien
})

//4to ENDPOINT
//UPDATE
router.put('/:id',(req,res)=>{
  const product = products.find(prod => prod.id === parseInt(req.params.id))
  if(!product) return res.status(404).send('Producto no encontrado');
  // el atributo titulo se va a modificar de acuerdo a lo q envie o quedará como está
  product.title = req.body.title || product.title 
  product.precio = req.body.precio || product.precio 
  // respuesta que se mostrará  
  res.status(201).json(product)
})

//5to ENDPOINT
//DELETE
router.delete('/:id', (req, res) =>{
  const productIndex = products.findIndex(prod => prod.id === parseInt(req.params.id))

  if(productIndex == -1) return res.status(404).send('Producto no encontrado');

  const deleteProduct = products.splice(productIndex, 1);

  res.json(deleteProduct)
})


module.exports = router