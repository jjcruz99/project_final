        // Simulamos el archivo JSON con datos de usuarios
        const users = [{
                "email": "Patusalud@gmail.com",
                "password": "Patusalud2023@",
                "fullname": "Patu Salud",
                "photo": "../img/yulian.jpg",
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
            },
            {
                "email": "angie.baron@patusalud.com",
                "password": "Patusalud2023@Angie",
                "fullname": "Angie Barón",
                "photo": "../img/Angie.png",
                "age": 27,
                "reason": "Sufre de ansiedad social"
            },
            {
                "email": "john.cruz@patusalud.com",
                "password": "Patusalud2023@John",
                "fullname": "John Cruz",
                "photo": "../img/john.jpg",
                "age": 40,
                "reason": "Está buscando ayuda por problemas familiares"
            },
            {
                "email": "katherinne.cardenas@patusalud.com",
                "password": "Patusalud2023@Katherinne",
                "fullname": "Katherinne Cárdenas",
                "photo": "../img/kathe.jpg",
                "age": 32,
                "reason": "Quiere mejorar su autoestima"
            },
            {
                "email": "gissell.trejos@patusalud.com",
                "password": "Patusalud2023@Gissell",
                "fullname": "Gissell Trejos",
                "photo": "../img/Gissell.png",
                "age": 30,
                "reason": "Busca superar una ruptura amorosa"
            }
        ];

        let currentUser = users[0]; // Simulamos que el primer usuario ha iniciado sesión

        // Cargar los datos del usuario
        function loadUserProfile() {
            document.getElementById('user-photo').src = currentUser.photo;
            document.getElementById('user-name').textContent = currentUser.fullname;
            document.getElementById('user-email').textContent = currentUser.email;
            document.getElementById('user-phone').textContent = "No disponible"; // Información no proporcionada en el JSON
            document.getElementById('user-address').textContent = "No disponible"; // Información no proporcionada en el JSON
            document.getElementById('user-age').textContent = currentUser.age;
            document.getElementById('user-reason').textContent = currentUser.reason;

            // Prellenamos los campos de edición
            document.getElementById('edit-firstname').value = currentUser.fullname.split(' ')[0]; // Primer nombre
            document.getElementById('edit-secondname').value = currentUser.fullname.split(' ')[1] || ''; // Segundo nombre
            document.getElementById('edit-lastname').value = currentUser.fullname.split(' ')[2] || ''; // Primer apellido
            document.getElementById('edit-email').value = currentUser.email;
            document.getElementById('edit-age').value = currentUser.age;
            document.getElementById('edit-reason').value = currentUser.reason;
        }

        // Previsualizar imagen subida
        function previewImage(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('user-photo').src = e.target.result;
            }
            reader.readAsDataURL(file);
        }

        // Guardar los cambios en el perfil
        function saveProfile() {
            const newFirstname = document.getElementById('edit-firstname').value;
            const newSecondname = document.getElementById('edit-secondname').value;
            const newLastname = document.getElementById('edit-lastname').value;
            const newEmail = document.getElementById('edit-email').value;
            const newAge = document.getElementById('edit-age').value;
            const newReason = document.getElementById('edit-reason').value;

            // Actualizar los datos del usuario actual
            currentUser.fullname = `${newFirstname} ${newSecondname} ${newLastname}`;
            currentUser.email = newEmail;
            currentUser.age = newAge;
            currentUser.reason = newReason;

            // Mostrar los nuevos datos en el perfil
            loadUserProfile();
            alert("Perfil actualizado con éxito.");
        }

        // Cerrar sesión
        function logout() {
            // Simular que se cierra la sesión y redirigir a la pantalla de inicio
            alert("Has cerrado sesión.");
            window.location.href = "login.html"; // Redirigir a la página de inicio de sesión
        }

        // Cargar el perfil al cargar la página
        window.onload = loadUserProfile;