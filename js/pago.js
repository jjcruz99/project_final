let contadorProductos = localStorage.getItem("canProductos");
// Espera a que el DOM se haya cargado completamente
// document.addEventListener('DOMContentLoaded', function() {
 
// });

function agregarArticulos() {
  
  let valorCompra = document.getElementById('valorCompra');
  let iva = document.getElementById('iva');
  let totalCompra = document.getElementById('TotalCompra');

   if(contadorProductos>0){

   let sumatoriaValorCompra =0 ;

    // Iterar sobre todas las claves del localStorage
    for (let i = 0; i < localStorage.length; i++) {
    const clave = localStorage.key(i);
    
       ///if  para obtener el numero del producto 
         if(clave.slice(0,3) === "img"){
            let numeroProducto = parseInt(clave[3]);
                 if(clave.length > 4){
                    numeroProducto = parseInt(clave.slice(3,5)) ;
                 }

             console.log(numeroProducto);
            // Crear <div> que contiene dos div img y detalles
            const containerCards = document.createElement('div');

            // Asignar una clase y un id al <div>
            containerCards.className = 'container-cards';
            containerCards.id='container-cards'+numeroProducto;

            ////crear dos div para la imagen y los datos de los articulos
            //////contenedor de la imagen y botones + -
            const containerImg = document.createElement('div')
            containerImg.className = 'container-imagen';
            containerImg.id = 'container-imagen';
            
            ///insertar imagen
            const imgProducto = document.createElement('img');
            imgProducto.src = localStorage.getItem('img'+numeroProducto);
            containerImg.append(imgProducto);
            ///insertar botones con sus respectivas funciones
            const containerBotones = document.createElement('div')
            containerBotones.className = "containerBotones";
            const botonMas = document.createElement('button');
            botonMas.textContent = "+";
            botonMas.addEventListener('click',function () {
              funAgregar(numeroProducto);
            });
            const botonMenos = document.createElement('button');
            botonMenos.textContent = "-";
            botonMenos.addEventListener('click',function () {
              funEliminar(numeroProducto);
            });
            containerBotones.append(botonMas,botonMenos);
            containerImg.append(containerBotones);

            ///contenedor detalles del producto
            const containerDetalles = document.createElement('div')
            containerDetalles.className = 'container-detalles';
            containerDetalles.id = 'container-detalles';
            
            const name = document.createElement('p');
            name.textContent = localStorage.getItem('name'+numeroProducto);
            const referencia = document.createElement('p');
            referencia.textContent = "Referencia : " + localStorage.getItem('referencia'+numeroProducto);
            const precio = document.createElement('p');
            precio.textContent = "Precio : $ " + localStorage.getItem('precio'+numeroProducto);
            containerDetalles.append(name,referencia,precio);
            // añadir los dos contenedores al container-cards
            containerCards.append(containerImg,containerDetalles);

            // Insertar el <div> en el contenedor padre
            document.getElementById('conatiner-articulos').appendChild(containerCards);
              
            ///calular el precio total de los articulos
            sumatoriaValorCompra += (parseFloat(localStorage.getItem('precio'+numeroProducto)) * 1000 );
              
            //sumar los precios
            valorCompra.textContent = "Valor = $ "+ sumatoriaValorCompra;
         }
    }
     iva.textContent = "IVA (19% ) = $ "+ (sumatoriaValorCompra*0.19).toFixed(2);
     totalCompra.textContent = "Total = $ " + ((sumatoriaValorCompra*0.19)+ sumatoriaValorCompra).toFixed(2);
    }
   else{
    alert("No hay productos en el carrito");
    valorCompra.textContent = "Valor = 0";
    iva.textContent = "IVA (19% ) = 0";
    totalCompra.textContent = "Total = 0";

    const containerCarroVacio = document.createElement('div');
    containerCarroVacio.id = "container-carro-vacio";
    containerCarroVacio.innerHTML = `<p> ¡Que esperas! </p>
      <p> Agrega tu articulo </p>
      <span class="icono-regalo">🎁</span>
      `;
      document.getElementById('conatiner-articulos').appendChild(containerCarroVacio);
   }

  }
  agregarArticulos();

  function actualizar() {
    location.reload();
}


function funAgregar(ubicacion){
  
  let ultimoProducto = 0;
  let numeroProducto2 =0;
  for (let i = 0; i < localStorage.length; i++) {
    const clave2 = localStorage.key(i); 
  ///obtener el numero del ultimo producto 
     if(clave2.slice(0,3) === "img"){
       numeroProducto2 = parseInt(clave2[3]);
        if(clave2.length > 4){
           numeroProducto2 = parseInt(clave2.slice(3,5)) ;
         }
       }
       if(numeroProducto2 > ultimoProducto){
          ultimoProducto = numeroProducto2 ;
       }
  }
  ////indice del ultimo producto
  ultimoProducto++;
  /////datos del articulo a clonar
  const  clonName = localStorage.getItem("name"+ubicacion);
  const  clonReferencia = localStorage.getItem("referencia"+ubicacion);
  const  clonImg = localStorage.getItem("img"+ubicacion);
  const  clonPrecio = localStorage.getItem("precio"+ubicacion);
  alert("Has agregado otro " + clonName + " a tu carrito");
  ///guardar en el LS el producto adicional
  localStorage.setItem("name"+ultimoProducto,clonName);
  localStorage.setItem("referencia"+ultimoProducto,clonReferencia);
  localStorage.setItem("img"+ultimoProducto,clonImg);
  localStorage.setItem("precio"+ultimoProducto,clonPrecio);

  contadorProductos++;
  localStorage.setItem("canProductos",contadorProductos);
   
  actualizar();
}

function funEliminar(ubicacion){
  alert("Eliminaste el articulo : " + localStorage.getItem("name"+ubicacion));
  localStorage.removeItem("img"+ubicacion);
  localStorage.removeItem("name"+ubicacion);
  localStorage.removeItem("precio"+ubicacion);
  localStorage.removeItem("referencia"+ubicacion);
  document.getElementById('container-cards'+ubicacion).remove();
  
  contadorProductos--;
  localStorage.setItem("canProductos",contadorProductos);
   
  actualizar();
}

// const containerCards = document.getElementById('cards');
// const img = document.createElement('img');
// const parrafo = document.createElement('p');
// parrafo.innerText = localStorage.getItem('name1');
// const imgLS = localStorage.getItem('img1');
// img.src = imgLS;
// containerCards.appendChild(parrafo);
// containerCards.appendChild(img);


