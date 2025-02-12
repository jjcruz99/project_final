// Array de usuarios predeterminados (debe ser cargado desde un JSON o similar)
const usuarios = [{
        "email": "Patusalud@gmail.com",
        "password": "Patusalud2023@",
        "fullname": "Patu Salud",
        "photo": "../img/Logo.png",
        "age": 29,
        "reason": "Busca mejorar su bienestar emocional"
    },
    {
        "email": "yulian.vargas@patusalud.com",
        "password": "Patusalud2023@Yulian",
        "fullname": "Yulian Vargas",
        "photo": "../img/yulian.jpg",
        "age": 35,
        "reason": "Está buscando superar el estrés laboral"
    }
];

let currentUser = null; // Variable para almacenar el usuario actual

// Función para manejar el inicio de sesión
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el comportamiento por defecto del formulario

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Buscar al usuario en el array de usuarios
    currentUser = usuarios.find(user => user.email === email && user.password === password);

    if (currentUser) {
        // Si el usuario es encontrado, cargar su perfil
        loadUserProfile();
        alert("Bienvenido, " + currentUser.fullname);
        window.location.href = "perfil.html"; // Redirige a la página del perfil
    } else {
        alert("Correo o contraseña incorrectos.");
    }
});

// Cargar los datos del perfil del usuario
function loadUserProfile() {
    if (currentUser) {
        document.getElementById('user-photo').src = currentUser.photo;
        document.getElementById('user-name').textContent = currentUser.fullname;
        document.getElementById('user-email').textContent = currentUser.email;
        document.getElementById('user-age').textContent = currentUser.age;
        document.getElementById('user-reason').textContent = currentUser.reason;

        document.getElementById('edit-firstname').value = currentUser.fullname.split(' ')[0];
        document.getElementById('edit-lastname').value = currentUser.fullname.split(' ')[1] || '';
        document.getElementById('edit-email').value = currentUser.email;
        document.getElementById('edit-age').value = currentUser.age;
        document.getElementById('edit-reason').value = currentUser.reason;
    }
}

// Guardar los cambios en el perfil (cuando el usuario edite su información)
document.getElementById('edit-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const newFirstname = document.getElementById('edit-firstname').value;
    const newLastname = document.getElementById('edit-lastname').value;
    const newEmail = document.getElementById('edit-email').value;
    const newAge = document.getElementById('edit-age').value;
    const newReason = document.getElementById('edit-reason').value;

    currentUser.fullname = `${newFirstname} ${newLastname}`;
    currentUser.email = newEmail;
    currentUser.age = newAge;
    currentUser.reason = newReason;

    loadUserProfile();
    alert("Perfil actualizado con éxito.");
});

// Cerrar sesión
function logout() {
    alert("Has cerrado sesión.");
    window.location.href = "inicioSesion.html"; // Redirigir al login después de cerrar sesión
}

// Función para alternar entre modo claro y oscuro
function toggleDarkMode() {
    document.body.classList.toggle('dark');
}

// Función para mostrar alertas
function showAlert(message, type) {
    const alertContainer = document.getElementById('alert-container');
    const alert = document.createElement('div');
    alert.classList.add('alert', type);
    alert.innerText = message;
    alertContainer.appendChild(alert);

    setTimeout(() => alert.remove(), 4000);
}

// Función para manejar el submit del formulario de inicio de sesión o registro
async function handleSubmit(event) {
    event.preventDefault();
    const isLogin = document.getElementById('form-title').innerText === "Iniciar Sesión";
    const usuarios = await getUsuariosCombinados();

    if (isLogin) {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const usuario = usuarios.find(u => u.email === email && u.password === password);

        if (usuario) {
            localStorage.setItem('loggedUser', JSON.stringify(usuario));
            showAlert('¡Bienvenido!', 'success');
            window.location.href = 'perfil.html';
        } else {
            showAlert('Usuario o contraseña incorrectos.', 'error');
        }
    } else {
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const fullname = document.getElementById('fullname').value;

        if (usuarios.some(u => u.email === email)) {
            showAlert('El usuario ya existe.', 'error');
        } else {
            const nuevosUsuarios = getUsuariosDesdeLocalStorage();
            nuevosUsuarios.push({ email, password, fullname });
            saveUsuarios(nuevosUsuarios);
            showAlert('¡Usuario registrado correctamente!', 'success');
        }
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

// Función para cambiar entre los formularios de inicio de sesión y registro
function toggleForm() {
    const container = document.getElementById('container');
    const formTitle = document.getElementById('form-title');
    const formDescription = document.getElementById('form-description');
    const submitButton = document.querySelector('.submit-btn');
    const loginFields = document.getElementById('login-form');
    const registerFields = document.getElementById('register-fields');

    if (formTitle.innerText === 'Iniciar Sesión') {
        formTitle.innerText = 'Registrarse';
        formDescription.innerText = 'Crea tu cuenta para comenzar';
        submitButton.innerText = 'Registrarme';
        container.classList.add('registered');
        loginFields.style.display = 'none';
        registerFields.style.display = 'block';
    } else {
        formTitle.innerText = 'Iniciar Sesión';
        formDescription.innerText = 'Ingresa tus credenciales para acceder';
        submitButton.innerText = 'Iniciar Sesión';
        container.classList.remove('registered');
        loginFields.style.display = 'block';
        registerFields.style.display = 'none';
    }
}

// Función para verificar la fortaleza de la contraseña
function checkPasswordStrength() {
    const passwordInput = document.getElementById('register-password');
    const strengthBar = document.getElementById('register-password-strength');
    const password = passwordInput.value;

    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[\W_]/.test(password)) strength++;

    strengthBar.className = 'password-strength';
    strengthBar.classList.remove('strength-weak', 'strength-medium', 'strength-strong');
    if (strength < 2) {
        strengthBar.classList.add('strength-weak');
    } else if (strength < 4) {
        strengthBar.classList.add('strength-medium');
    } else {
        strengthBar.classList.add('strength-strong');
    }
}

// Función para cerrar sesión y eliminar el usuario logueado
function logout() {
    localStorage.removeItem('loggedUser');
    const userIcon = document.querySelector('.IconUser');
    userIcon.src = '../img/user2.png';
    userIcon.alt = 'Icono de usuario';
    showAlert('¡Has cerrado sesión!', 'success');
}

window.onload = function() {
    const loggedUser = localStorage.getItem('loggedUser');
    if (loggedUser) {
        const user = JSON.parse(loggedUser);
        const userIcon = document.querySelector('.IconUser');
        userIcon.src = user.photo || '../img/user2.png';
        userIcon.alt = `Foto de ${user.fullname}`;
        showLogoutOption();
    }
};

function showLogoutOption() {
    const logoutOption = document.getElementById('logout-option');
    logoutOption.style.display = 'block';
}

function hideLogoutOption() {
    const logoutOption = document.getElementById('logout-option');
    logoutOption.style.display = 'none';
}

document.querySelector('.IconUser').addEventListener('click', toggleDropdown);

function toggleDropdown() {
    const logoutOption = document.getElementById('logout-option');
    logoutOption.style.display = logoutOption.style.display === 'block' ? 'none' : 'block';
}