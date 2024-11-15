$(document).ready(function () {
    // Función para mostrar/ocultar la contraseña
    $('#bt-password').on('click', function () {
        const passwordInput = $('#password');
        const icon = $('#icon-password');

        if (passwordInput.attr('type') === 'password') {
            passwordInput.attr('type', 'text'); // Muestra la contraseña
            icon.attr('src', './assets/icons/ocult.png'); // Cambio de img
        } else {
            passwordInput.attr('type', 'password'); // Oculta la contraseña
            icon.attr('src', './assets/icons/show.png'); // Cambio de img
        }
    });

});
