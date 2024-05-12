document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            // Aquí puedes enviar los datos de inicio de sesión al servidor para verificar
            console.log("Login:", username, password);
        });
    }
});