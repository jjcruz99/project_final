// Función para alternar entre modo claro y oscuro
function toggleDarkMode() {
    document.body.classList.toggle('dark'); // Cambia la clase del body para activar o desactivar el modo oscuro
}

// Función para mostrar alertas
function showAlert(message, type) {
    const alertContainer = document.getElementById('alert-container');
    const alert = document.createElement('div'); // Crea un nuevo div para la alerta
    alert.classList.add('alert', type); // Añade las clases para el estilo de la alerta
    alert.innerText = message; // Establece el mensaje de la alerta
    alertContainer.appendChild(alert); // Añade la alerta al contenedor

    // Eliminar la alerta después de 6 segundos
    setTimeout(() => alert.remove(), 4000);
}

// Función para obtener los usuarios desde el archivo JSON
async function getUsuarios() {
    try {
        const response = await fetch('../json/usuarios.json'); // Carga el archivo JSON de usuarios
        if (!response.ok) throw new Error('Error al cargar los usuarios');
        const usuarios = await response.json(); // Parsea el JSON y lo convierte en objeto
        return usuarios; // Retorna el arreglo de usuarios
    } catch (error) {
        console.error(error);
        return []; // Retorna un arreglo vacío en caso de error
    }
}

// Función para obtener usuarios desde localStorage
function getUsuariosDesdeLocalStorage() {
    const usuarios = localStorage.getItem('usuarios');
    return usuarios ? JSON.parse(usuarios) : [];
}

// Función para combinar usuarios de JSON y localStorage
async function getUsuariosCombinados() {
    const usuariosJSON = await getUsuarios();
    const usuariosLocalStorage = getUsuariosDesdeLocalStorage();
    return [...usuariosJSON, ...usuariosLocalStorage];
}

// Función para guardar usuarios en localStorage
function saveUsuarios(usuarios) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Función para manejar el submit del formulario
// Manejo del formulario de inicio de sesión y registro
async function handleSubmit(event) {
    event.preventDefault();
    const isLogin = document.getElementById('form-title').innerText === "Iniciar Sesión";
    const usuarios = await getUsuariosCombinados();

    if (isLogin) {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const usuario = usuarios.find(u => u.email === email && u.password === password);

        if (usuario) {
            const userIcon = document.querySelector('.IconUser');
            userIcon.src = usuario.photo || '../img/user2.png';
            userIcon.alt = `Foto de ${usuario.fullname}`;
            localStorage.setItem('loggedUser', JSON.stringify(usuario));
            showAlert('¡Bienvenido!', 'success');
            window.location.href = '../HTML/perfil.html';
        } else {
            showAlert('Usuario o contraseña incorrectos.', 'error');
        }
    } else {
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const fullname = document.getElementById('fullname').value;
        const phone = document.getElementById('phone').value;

        if (usuarios.some(u => u.email === email)) {
            showAlert('El usuario ya existe.', 'error');
        } else {
            const nuevosUsuarios = getUsuariosDesdeLocalStorage();
            nuevosUsuarios.push({ email, password, fullname, phone });
            saveUsuarios(nuevosUsuarios);
            showAlert('¡Usuario registrado correctamente!', 'success');
        }
    }
}

// Función para obtener usuarios de localStorage
function getUsuariosDesdeLocalStorage() {
    const usuarios = localStorage.getItem('usuarios'); // Intenta obtener usuarios de localStorage
    return usuarios ? JSON.parse(usuarios) : []; // Retorna un arreglo vacío si no hay usuarios
}

// Función para guardar los usuarios en localStorage
function saveUsuarios(usuarios) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios)); // Guarda el arreglo de usuarios en localStorage
}

// Función para cambiar entre los formularios
function toggleForm() {
    const container = document.getElementById('container');
    const formTitle = document.getElementById('form-title');
    const formDescription = document.getElementById('form-description');
    const submitButton = document.querySelector('.submit-btn');
    const loginFields = document.getElementById('login-form');
    const registerFields = document.getElementById('register-fields');
    const passwordError = document.getElementById('password-error');

    if (formTitle.innerText === 'Iniciar Sesión') {
        formTitle.innerText = 'Registrarse';
        formDescription.innerText = 'Crea tu cuenta para comenzar';
        submitButton.innerText = 'Registrarme';
        container.classList.add('registered');
        loginFields.style.display = 'none'; // Oculta campos de inicio de sesión
        registerFields.style.display = 'block'; // Muestra campos de registro
        passwordError.style.display = 'none'; // Ocultar mensaje de error
    } else {
        formTitle.innerText = 'Iniciar Sesión';
        formDescription.innerText = 'Ingresa tus credenciales para acceder';
        submitButton.innerText = 'Iniciar Sesión';
        container.classList.remove('registered');
        loginFields.style.display = 'block'; // Muestra campos de inicio de sesión
        registerFields.style.display = 'none'; // Oculta campos de registro
    }
}

// Función para verificar la fortaleza de la contraseña
function checkPasswordStrength() {
    const passwordInput = document.getElementById('register-password');
    const strengthBar = document.getElementById('register-password-strength');
    const password = passwordInput.value;

    let strength = 0; // Inicializa la fortaleza de la contraseña
    if (password.length >= 6) strength++; // Longitud mínima
    if (/[A-Z]/.test(password)) strength++; // Letra mayúscula
    if (/[a-z]/.test(password)) strength++; // Letra minúscula
    if (/\d/.test(password)) strength++; // Número
    if (/[\W_]/.test(password)) strength++; // Carácter especial

    strengthBar.className = 'password-strength'; // Reinicia la clase de fortaleza
    strengthBar.classList.remove('strength-weak', 'strength-medium', 'strength-strong'); // Limpia clases previas
    if (strength < 2) {
        strengthBar.classList.add('strength-weak'); // Clase para fortaleza débil
    } else if (strength < 4) {
        strengthBar.classList.add('strength-medium'); // Clase para fortaleza media
    } else {
        strengthBar.classList.add('strength-strong'); // Clase para fortaleza fuerte
    }
}

// Función para verificar que las contraseñas coincidan
function checkPasswordMatch() {
    const passwordInput = document.getElementById('register-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const passwordError = document.getElementById('password-error');

    if (passwordInput.value !== confirmPasswordInput.value) {
        passwordError.style.display = 'block'; // Muestra el error si no coinciden
    } else {
        passwordError.style.display = 'none'; // Oculta el error si coinciden
    }
}

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('loggedUser'); // Elimina el usuario de localStorage
    const userIcon = document.querySelector('.IconUser'); // Selecciona la imagen de usuario
    userIcon.src = '../img/user2.png'; // Cambia de nuevo al icono original
    userIcon.alt = 'Icono de usuario'; // Cambia el alt para accesibilidad
    showAlert('¡Has cerrado sesión!', 'success'); // Muestra un mensaje de éxito
    hideLogoutOption(); // Esconde la opción de cerrar sesión
}

// Función para mostrar y ocultar la opción de cerrar sesión
function toggleDropdown() {
    const logoutOption = document.getElementById('logout-option'); // Asegúrate de tener un elemento para la opción de cerrar sesión
    const loggedUser = localStorage.getItem('loggedUser'); // Comprueba si hay un usuario logueado

    if (loggedUser) {
        // Alterna la visibilidad del botón de cerrar sesión
        logoutOption.style.display = logoutOption.style.display === 'block' ? 'none' : 'block';
    } else {
        window.location.href = './inicioSecion.html'; // Redirige a la página de inicio de sesión
    }
}

// Inicializar con algunos usuarios predeterminados si no hay datos en localStorage
window.onload = function() {
    if (!localStorage.getItem('usuarios')) {
        const usuariosIniciales = [{
                "email": "usuario1@ejemplo.com",
                "password": "contraseña1"
            },
            {
                "email": "usuario2@ejemplo.com",
                "password": "contraseña2"
            }
        ];
        saveUsuarios(usuariosIniciales); // Guardar usuarios iniciales en localStorage
    }

    // Cargar el estado de la sesión al iniciar
    const loggedUser = localStorage.getItem('loggedUser');
    if (loggedUser) {
        const user = JSON.parse(loggedUser);
        const userIcon = document.querySelector('.IconUser'); // Selecciona la imagen de usuario
        userIcon.src = user.photo || '../img/user2.png'; // Cambia el icono a la foto del usuario o a la por defecto
        userIcon.alt = `Foto de ${user.fullname}`; // Cambia el alt para accesibilidad
        showLogoutOption(); // Muestra la opción de cerrar sesión
    }
};

// Evento para mostrar la opción de cerrar sesión al hacer clic en el icono del usuario
document.querySelector('.IconUser').addEventListener('click', toggleDropdown); // Añade el evento al icono del usuario

// Función para mostrar la opción de cerrar sesión
function showLogoutOption() {
    const logoutOption = document.getElementById('logout-option'); // Asegúrate de tener este elemento en tu HTML
    logoutOption.style.display = 'block'; // Muestra la opción
}

// Función para ocultar la opción de cerrar sesión
function hideLogoutOption() {
    const logoutOption = document.getElementById('logout-option');
    logoutOption.style.display = 'none'; // Oculta la opción
}