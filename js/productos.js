// Cargar el archivo JSON con los productos
fetch('../json/items.json') // Cambiado aquí: 'products.json' -> 'items.json'
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error al cargar el archivo JSON: ${response.statusText}`);
        }
        return response.json(); // Parsear el archivo JSON
    })
    .then(data => {
        console.log(data); // Ver los datos en la consola

        const container = document.getElementById('products-container');
        if (!container) {
            console.error('El contenedor de productos no se encontró en el DOM.');
            return;
        }

        // Iterar sobre los productos en JSON
        data.items.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');

            productElement.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">$${product.precio}</p>
                <p class="quantity">Cantidad disponible: ${product.cantidad}</p>
                <button class="buy-button" onclick="buyProduct('${product.name}')">Comprar</button>
            `;

            container.appendChild(productElement); // Agregar el producto al contenedor
        });
    })
    .catch(error => {
        console.error('Error al cargar los productos:', error);
    });

// Función para manejar el evento de compra
function buyProduct(productName) {
    alert(`¡Has comprado el producto: ${productName}!`);
}