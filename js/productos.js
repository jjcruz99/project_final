
// Cargar el archivo JSON con los productos
fetch('http://localhost:8080/productos/listar') // Cambiado aquí: 'products.json' -> 'items.json'
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error al cargar el archivo JSON: ${response.statusText}`);
        }
        return response.json(); // Parsear el archivo JSON
    })
    .then(data => {////ejecuta despues de que una promesa ha sido resuelta
        //console.log(data); 
        //console.log(data[0].nombreProducto); 

        const container = document.getElementById('container-yoga');
        if (!container) {
            console.error('El contenedor de productos no se encontró en el DOM.');
            return;
        }    
        for (let i = 0; i <=3; i++) {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
                productElement.innerHTML = `
                <img src="${data[i].imagen_url}" alt="${data[i].nombreProducto}" ">
                <h3>${data[i].nombreProducto}</h3>
                <p>${data[i].descripcion}</p>
                <p class="price">$${data[i].precio_unitario}</p>
                <button class="buy-button" onclick="buyProduct('${data[i].nombreProducto}',
                '${data[i].referencia}',
                 '${data[i].imagen_url}',
                 '${data[i].precio_unitario}',
                 '${data[i].id_producto}'
                )">Comprar</button>
            `;
            container.appendChild(productElement); // Agregar el producto al contenedor
        }

        /////seccion ejercicio
        const container2 = document.getElementById('container-ejercicio');
        if (!container2) {
            console.error('El contenedor de productos no se encontró en el DOM.');
            return;
        }
          
        for (let i = 4; i <=7; i++) {
        const productElement2 = document.createElement('div');
        productElement2.classList.add('product');
                productElement2.innerHTML = `
                <img src="${data[i].imagen_url}" alt="${data[i].nombreProducto}" ">
                <h3>${data[i].nombreProducto}</h3>
                <p>${data[i].descripcion}</p>
                <p class="price">$${data[i].precio_unitario}</p>
                <button class="buy-button" onclick="buyProduct('${data[i].nombreProducto}',
                '${data[i].referencia}',
                 '${data[i].imagen_url}',
                 '${data[i].precio_unitario}',
                 '${data[i].id_producto}'
                )">Comprar</button>
            `;
            container2.appendChild(productElement2); // Agregar el producto al contenedor
        }
  
        /////seccion varios

         const container3 = document.getElementById('container-varios');
        if (!container3) {
            console.error('El contenedor de productos no se encontró en el DOM.');
            return;
        }
          
        for (let i = 8; i <=11; i++) {
        const productElement3 = document.createElement('div');
        productElement3.classList.add('product');
                productElement3.innerHTML = `
               <img src="${data[i].imagen_url}" alt="${data[i].nombreProducto}" ">
                <h3>${data[i].nombreProducto}</h3>
                <p>${data[i].descripcion}</p>
                <p class="price">$${data[i].precio_unitario}</p>
                <button class="buy-button" onclick="buyProduct('${data[i].nombreProducto}',
                '${data[i].referencia}',
                 '${data[i].imagen_url}',
                 '${data[i].precio_unitario}',
                 '${data[i].id_producto}'
                )">Comprar</button>
            `;
            container3.appendChild(productElement3); // Agregar el producto al contenedor
        }

    })
    .catch(error => {
        console.error('Error al cargar los productos:', error);
    });



///funcion para mostrar los productos en el carrito
const conteocarro = document.getElementById('Conteocarro');
function cantidadProductosCarrito(){
    
    fetch('http://localhost:8080/traer/pedido/1')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error al cargar el archivo JSON: ${response.statusText}`);
        }
        return response.json(); // Parsear el archivo JSON
    })
    .then(data2 => {////ejecuta despues de que una promesa ha sido resuelta   
    conteocarro.innerText=data2.length;
    })
    .catch(error => {
        console.error('Error al cargar los productos:', error);
        });
}
cantidadProductosCarrito();


// Función para manejar el evento de compra
function buyProduct(productName,referencia,imagen,precio,id_producto) {
   
    
   //Guardar los productos en la base de datos entidad pedido
     const fecha = new Date().toISOString().split('T')[0]; // Obtener la fecha actual en formato año-mes-día
     
            const pedido = {
                cantidad: 1,
                fecha_pedido: fecha,
                precio_total: 0,
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

    //aumentar la cantidad de productos en el carrito
    conteocarro.innerText = parseInt(conteocarro.innerText)+1;
        
    ///genera una alerta
    const alerta = document.getElementById('miAlerta');
    alerta.style.display = 'block';
                setTimeout(() => {
                    alerta.style.display = 'none';
                },2000); // Ocultar después de 3 segundos

}
 

//evento para mostrar alerta de productos en el carrito
document.querySelector('.carrito').addEventListener('mouseover', function() {

    const alerta2 = document.getElementById('miAlerta2');
    alerta2.style.display = 'block';
                setTimeout(() => {
                    alerta2.style.display = 'none';
                },3000); // Ocultar después de 3 segundos
            
    });

//evento para redireccionar a la pagina de pagos
document.querySelector('.carrito').addEventListener('click', function() {
      window.location.href ='pagos.html';   
});