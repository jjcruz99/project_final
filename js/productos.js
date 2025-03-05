
// Cargar el archivo JSON con los productos
fetch('../json/items.json') // Cambiado aquí: 'products.json' -> 'items.json'
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error al cargar el archivo JSON: ${response.statusText}`);
        }
        return response.json(); // Parsear el archivo JSON
    })
    .then(data => {////ejecuta despues de que una promesa ha sido resuelta
        //console.log(data); 

        const container = document.getElementById('container-yoga');
        if (!container) {
            console.error('El contenedor de productos no se encontró en el DOM.');
            return;
        }    
        for (let i = 0; i <=3; i++) {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
                productElement.innerHTML = `
                <img src="${data.items[i].img}" alt="${data.items[i].name}" ">
                <h3>${data.items[i].name}</h3>
                <p>${data.items[i].description}</p>
                <p class="price">$${data.items[i].precio}</p>
                <button class="buy-button" onclick="buyProduct('${data.items[i].name}',
                '${data.items[i].referencia}',
                 '${data.items[i].img}',
                 '${data.items[i].precio}'
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
                <img src="${data.items[i].img}" alt="${data.items[i].name}">
                <h3>${data.items[i].name}</h3>
                <p>${data.items[i].description}</p>
                <p class="price">$${data.items[i].precio}</p>
                <button class="buy-button" onclick="buyProduct('${data.items[i].name}',
                '${data.items[i].referencia}',
                '${data.items[i].img}',
                '${data.items[i].precio}'
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
                <img src="${data.items[i].img}" alt="${data.items[i].name}">
                <h3>${data.items[i].name}</h3>
                <p>${data.items[i].description}</p>
                <p class="price">$${data.items[i].precio}</p>
                <button class="buy-button" onclick="buyProduct('${data.items[i].name}',
                '${data.items[i].referencia}',
                '${data.items[i].img}',
                '${data.items[i].precio}'
                )">Comprar</button>
            `;
            container3.appendChild(productElement3); // Agregar el producto al contenedor
        }

    })
    .catch(error => {
        console.error('Error al cargar los productos:', error);
    });


///llevar el conteo de productos desde el local storage
let contadorProductos = localStorage.getItem("canProductos");
let conteocarro = document.getElementById('Conteocarro');
conteocarro.innerText=contadorProductos;

// Función para manejar el evento de compra
function buyProduct(productName,referencia,imagen,precio) {
    ///genera una alerta
    const alerta = document.getElementById('miAlerta');
    alerta.style.display = 'block';
                setTimeout(() => {
                    alerta.style.display = 'none';
                },3000); // Ocultar después de 3 segundos

    //mostrar cantidad de productos en el carro
    contadorProductos++;
    conteocarro = document.getElementById('Conteocarro');
    conteocarro.innerText=contadorProductos;
    
    ///Agregar los productos comprados en el local storage
    localStorage.setItem("canProductos",contadorProductos);///conocer la cantidad de productos en el LS
    localStorage.setItem("name"+[contadorProductos],productName);
    localStorage.setItem("referencia"+[contadorProductos],referencia);
    localStorage.setItem("img"+[contadorProductos],imagen);
    localStorage.setItem("precio"+[contadorProductos],precio);
}


document.querySelector('.carrito').addEventListener('mouseover', function() {

    const alerta2 = document.getElementById('miAlerta2');
    alerta2.style.display = 'block';
                setTimeout(() => {
                    alerta2.style.display = 'none';
                },3000); // Ocultar después de 3 segundos
            
    });

document.querySelector('.carrito').addEventListener('click', function() {
      window.location.href ='pagos.html';   
});