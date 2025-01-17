document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            // Po zalogowaniu przekieruj do index.html
            window.location.href = 'index.html';
        });
    }
});