// Variables para controlar el carrusel
let carruselIndex = 0;
const tareas = document.querySelector(".tareas");
const totalServicios = document.querySelectorAll(".tarea").length;
const servicioWidth = document.querySelector(".tarea").offsetWidth + 20; // Tamaño de la tarjeta + el margen

// Función para mover el carrusel
function moverCarrusel(direccion) {
    if (direccion === 'derecha') {
        // Mover a la derecha
        if (carruselIndex < totalServicios - 4) {
            carruselIndex++;
        }
    } else if (direccion === 'izquierda') {
        // Mover a la izquierda
        if (carruselIndex > 0) {
            carruselIndex--;
        }
    }
    // Cambiar la posición del carrusel
    tareas.style.transform = `translateX(-${carruselIndex * servicioWidth}px)`;
}
// Función para mostrar el modal
function mostrarModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

// Función para cerrar el modal
function cerrarModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}