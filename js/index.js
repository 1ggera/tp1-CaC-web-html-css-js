//MENU
document.querySelector('.nav-toggle').addEventListener('click', function () {
  document.querySelector('.nav-menu-list').classList.toggle('show');
});

//PROMOCIONES

//CARRUSEL
let flechas = document.getElementsByTagName('span');

// Selecciona todos los elementos del documento HTML que tienen la clase producto
let producto = document.getElementsByClassName('producto');

// Calcula el número de páginas necesarias para mostrar todos las cards, asumiendo que quiero mostrar 4 cards por página. Ceil redondea hacia arriba
let producto_pagina = producto.length;

let l = 0; //cuanto se movió la fila de productos
let movePer = 40;
let maxMove = 200;

//vista para pantallas 768px 
//let pantalla;
if (window.matchMedia("(max-width: 320px)").matches) {
  movePer = 40;
  maxMove = 1550;
}
else if (window.matchMedia("(max-width: 768px)").matches) {
  movePer = 40;
  maxMove = 200;
}

//botones
let movim_der = () => {
  l = l + movePer;
  if (producto.length == 1) {
    l = 0;
  }

  for (const i of producto) {
    if (l > maxMove) { l = l - movePer; }
    i.style.left = '-' + l + '%';
  }
}

let movim_izq = () => {
  l = l - movePer;
  if (l <= 0) {
    l = 0;
  }

  for (const i of producto) {
    if (producto_pagina > 1)
      i.style.left = '-' + l + '%';
  }
}

flechas[1].onclick = () => { movim_der(); }
flechas[0].onclick = () => { movim_izq(); }
//FIN CARRUSEL

//PRODUCTOS Y COMPRAS
function comprar() {
  alert('Bien hecho!')
}

function agregarProducto() {
  alert('Agregado al carrito')
}

let productosFavoritos = () => {
  var productosFav = document.getElementsByClassName('producto');
  console.log(productosFav.indexOf);

  //para tomar un id
  //var productoSeleccionado = document.querySelectorAll('#producto')

  //para tomar una etiqueta
  //var productoSeleccionado = document.querySelectorAll('div')

  //para tomar un name
  //var productoSeleccionado = document.querySelectorAll('name="producto')

  //para tomar una clase
  //var productoSeleccionado = document.querySelectorAll('.producto')
}
//productosFavoritos();
const favoritos = Array();


//CONTACTO
let mostrarNombre = () => {
  //en el input 'username' agregar el name="username"
  //en el input 'email' agregar el name="email"

  //getElementsByName trae un array, yo quiero el valor 0
  var username = getElementsByName('username')[0].value;
  var email = getElementsByName('email')[0].value;

  console.log("Nombre de usuario:", username);
  console.log("Correo electrónico:", email);
}
//ejecutar la función con onclick el algún botón


//SESIÓN DE USUARIO Y LOGIN
const nombreGuardado = sessionStorage.getItem('nombre');
function ingresaNombre() {
  if (nombreGuardado) {
    //si hay un nombre hasta el momento, lo muestra
    console.log('Nombre obtenido de SessionStorage: ', nombreGuardado);
  } else {
    //sino, te lo pide
    const nombre = prompt('Ingresá un nombre: ');
    if (nombre) {
      //si lo ingresa lo guarda
      sessionStorage.setItem('nombre', nombre);
      //y lo muestra
      console.log('Nombre guardado en SessionStorage:', nombre);
    } else {
      //sino, te avisa q no ingresó nada
      console.log('No se guardó ningún nombre');
    }
  }
}
const apellidoGuardado = sessionStorage.getItem('apellido');
function ingresaApellido() {
  if (apellidoGuardado) {
    //si hay un apellido hasta el momento, lo muestra
    console.log('Apellido obtenido de SessionStorage: ', apellidoGuardado);
  } else {
    //sino, te lo pide
    const apellido = prompt('Ingresá un apellido: ');
    if (apellido) {
      //si lo ingresa lo guarda
      sessionStorage.setItem('apellido', apellido);
      //y lo muestra
      console.log('Apellido guardado en SessionStorage:', apellido);
    } else {
      //sino, te avisa q no ingresó nada
      console.log('No se guardó ningún apellido');
    }
  }
}
ingresaNombre();
ingresaApellido();

//
