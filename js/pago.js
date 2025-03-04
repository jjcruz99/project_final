let contadorProductos = 0;
const notyf = new Notyf();

function agregarArticulos() {
  
  let valorCompra = document.getElementById('valorCompra');
  let iva = document.getElementById('iva');
  let totalCompra = document.getElementById('TotalCompra');

        // Cargar el archivo JSON con los productos
      fetch('http://localhost:8080/traer/pedido/1') // Cambiado aquí: 'products.json' -> 'items.json'
      .then(response => {
          if (!response.ok) {
              throw new Error(`Error al cargar el archivo JSON: ${response.statusText}`);
          }
          return response.json(); // Parsear el archivo JSON
      })
      .then(data => {////ejecuta despues de que una promesa ha sido resuelta
          console.log(data); 
          console.log("Extrayendo producto 0:"); 
          console.log(data[0].producto);

          //Determinar la cantidad de productos en el carrito
          contadorProductos = data.length;
          console.log("Cantidad de productos en el carrito: "+contadorProductos);
                      if(contadorProductos>0){

                        let sumatoriaValorCompra =0 ;
                    
                        // Iterar sobre todos los productos en el carrito
                        for (let i = 0; i < contadorProductos; i++) {
    
                                // Crear <div> que contiene dos div img y detalles
                                const containerCards = document.createElement('div');
                    
                                // Asignar una clase y un id al <div>
                                containerCards.className = 'container-cards';
                                containerCards.id='container-cards'+data[i].producto.id_producto;
                    
                                ////crear dos div para la imagen y los datos de los articulos
                                //////contenedor de la imagen y botones + -
                                const containerImg = document.createElement('div')
                                containerImg.className = 'container-imagen';
                                containerImg.id = 'container-imagen';
                                
                                ///insertar imagen
                                const imgProducto = document.createElement('img');
                                imgProducto.src = data[i].producto.imagen_url;
                                containerImg.append(imgProducto);

                                ///insertar botones con sus respectivas funciones
                                const containerBotones = document.createElement('div')
                                containerBotones.className = "containerBotones";
                                const botonMas = document.createElement('button');
                                botonMas.textContent = "+";
                                botonMas.addEventListener('click',function () {
                                  funAgregar(data[i].producto.id_producto,data[i].producto.precio_unitario);
                                });
                                const botonMenos = document.createElement('button');
                                botonMenos.textContent = "-";
                                botonMenos.addEventListener('click',function () {
                                  funEliminar(data[i].id_pedido);
                                });
                                containerBotones.append(botonMas,botonMenos);
                                containerImg.append(containerBotones);
                    
                                ///contenedor detalles del producto
                                const containerDetalles = document.createElement('div')
                                containerDetalles.className = 'container-detalles';
                                containerDetalles.id = 'container-detalles';
                                
                                const name = document.createElement('p');
                                name.textContent = data[i].producto.nombreProducto;
                                const referencia = document.createElement('p');
                                referencia.textContent = "Referencia : " + data[i].producto.referencia;
                                const precio = document.createElement('p');
                                precio.textContent = "Precio : $ " + data[i].producto.precio_unitario;
                                containerDetalles.append(name,referencia,precio);
                                // añadir los dos contenedores al container-cards
                                containerCards.append(containerImg,containerDetalles);
                    
                                // Insertar el <div> en el contenedor padre
                                document.getElementById('conatiner-articulos').appendChild(containerCards);
                                  
                                     ///calular el precio total de los articulos
                                sumatoriaValorCompra += data[i].producto.precio_unitario;
                                  
                                    //sumar los precios
                                valorCompra.textContent = "Valor = $ "+ sumatoriaValorCompra;
                              }
                        
                          iva.textContent = "IVA (19% ) = $ "+ (sumatoriaValorCompra*0.19).toFixed(2);
                          totalCompra.textContent = "Total = $ " + ((sumatoriaValorCompra*0.19)+ sumatoriaValorCompra).toFixed(2);
                       }
                        else{
                        notyf.success("No hay productos en el carrito");
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

        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
 

  }//fin funcion agregarArticulos
  agregarArticulos();

  function actualizar() {
    location.reload();
}


function funAgregar(id_producto,precio){

  notyf.success("Agregaste un articulo");
   //Guardar los productos en la base de datos entidad pedido

   // Obtener la fecha actual en formato año-mes-día
   const fecha = new Date().toISOString().split('T')[0]; 
     
   const pedido = {
       cantidad: 1,
       fecha_pedido: fecha,
       precio_total: precio,
       usuario: { id_usuario: 1 },
       producto: { id_producto: id_producto }///agregar el id del producto
   };

   fetch('http://localhost:8080/agregar/pedido', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify(pedido)
   })
   .then(response => response.json())
   .then(data => console.log('Pedido guardado:'+ data))
   //.catch(error => console.alerta('Error:'+ error));
  
  // Esperar 3 segundos (1500 ms) antes de llamar a la función actualizar
  setTimeout(actualizar, 1500); 
}

function funEliminar(id_pedido){
  notyf.error("Eliminaste un articulo");

  fetch(`http://localhost:8080/eliminar/pedido/${id_pedido}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
        console.log('Pedido eliminado correctamente');
    } else {
        console.error('Error al eliminar el pedido');
    }
  })
  .catch(error => console.error('Error:', error));
 
  localStorage.setItem("canProductos",contadorProductos);
  // Esperar 3 segundos (1500 ms) antes de llamar a la función actualizar
  setTimeout(actualizar, 1500);  
}




