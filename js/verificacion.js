// Aqui verificamos si esta registrado, primero creamos una funcion 
function verificarSesion() {
    // Buscamos en la locarstorage si existe un usuario
    return localStorage.getItem("usuario") !== null;
}

// Ahora realizamos la verificacion
document.addEventListener("DOMContentLoaded", function() {
let botonAgendar = document.getElementById("agendarcita");

// Si el boton existe, le agregamos un evento
if (botonAgendar){
    botonAgendar.addEventListener("click", function() {
        if (verificarSesion()) {
            window.location.href = "../agendarCita.html";
        } else {
            window.location.href = "../html/inicioSesion.html";
        }
    });
}
else{
    console.log("No existe el boton");
}

});