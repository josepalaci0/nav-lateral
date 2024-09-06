(function () {
    'use strict';

    var host = 'https://jose-data-json.gregoriomatrix.workers.dev'; // URL de tu API en Workers
    var hostlocal = 'http://127.0.0.1:8787'; // URL de tu API en Workers

    // Seleccionamos el formulario de login por su ID
    var form = document.getElementById('loginForm');

    /**
     * Evento para manejar el envío del formulario.
     * Previene la recarga automática de la página y gestiona la autenticación
     * con la API.
     */
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario

        // Recolecta los valores de los campos del formulario
        var formData = new FormData(form);
        var data = {
            email: formData.get('email'), // Obtiene el valor del campo 'email'
            password: formData.get('password')  // Obtiene el valor del campo 'password'
        };

        // Realiza la petición POST a la API de Node.js
        fetch(hostlocal+'/api/users/login', { // URL de tu API en Workers
            method: 'POST', // Utiliza el método POST
            headers: {
                'Content-Type': 'application/json' // El contenido será JSON
            },
            body: JSON.stringify(data) // Convertimos los datos en una cadena JSON
        })
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Error en el login. Verifica tus credenciales.');
            }
            return response.json(); // Convierte la respuesta a JSON
        })
        .then(function (data) {
            // Si el login es exitoso, redirigimos al usuario o almacenamos el token
            if (data.token) {
                localStorage.setItem('token', data.token); // Guarda el token en el almacenamiento local
                window.location.href = '/'; // Redirige al dashboard u otra página
            } else {
                // Si hay un error, muestra un mensaje
                alert('Login fallido: ' + data.message);
            }
        })
        .catch(function (error) {
            // Manejo de errores en la solicitud
            console.error('Error:', error);
            alert('Ocurrió un error. Intenta de nuevo más tarde.');
        });
    });
})();
