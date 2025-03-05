document.getElementById('form-contactenos').addEventListener('submit', function(event) {
    // Obtener todos los campos del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const telefono = document.getElementById('celular').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    // Verificar que los campos no esten vacios
    if (!nombre || !apellido || !email || !telefono || !mensaje ) {
        // Prevenir el envío del formulario
        event.preventDefault();
        alert('Por favor, complete todos los campos del formulario.');
    }
}); 