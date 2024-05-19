//CARRUSEL
let flechas = document.getElementsByTagName('span');

// Selecciona todos los elementos del documento HTML que tienen la clase producto
let producto = document.getElementsByClassName('producto');

// Calcula el número de páginas necesarias para mostrar todos las cards, asumiendo que quiero mostrar 4 cards por página. Ceil redondea hacia arriba
let producto_pagina = Math.ceil(producto.length/4);

let l = 0;
let movePer = 40.34;
let maxMove = 210;

//vista para pantallas 768px 
let telefono_view = window.matchMedia("(max-width: 768px)");
if(telefono_view.matches){
  movePer = 55.36;
  maxMove = 254;
}

let movim_der = () =>{
  l = l + movePer;
  if(producto.length == 1){l = 0;}

  for(const i of producto)
  {
    if(l>maxMove){l = l - movePer;}
    i.style.left = '-' + l + '%';
  }
}

let movim_izq = () => {
  l = l - movePer;
  if(l<=0){l=0;}

  for(const i of producto)
  {
    if(producto_pagina > 1)
    i.style.left = '-' + l + '%';
  }
}

flechas[1].onclick = ()=>{movim_der();}
flechas[0].onclick = ()=>{movim_izq();}
//FIN CARRUSEL