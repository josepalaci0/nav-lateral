// Simulación de obtención del correo del usuario desde localStorage o una API
document.addEventListener('DOMContentLoaded', () => {
    // Supongamos que el correo se almacena en el localStorage después del login
    const userEmail = localStorage.getItem('userEmail');

    // Si el correo está presente, lo mostramos en el h1
    if (userEmail) {
        document.getElementById('user-email').textContent = userEmail;
    } else {
        // Si no hay correo, redirigir al login o mostrar un mensaje de error
        window.location.href = 'login.html';
    }
});
