const BASE_URL = "https://secure-app-back.duckdns.org/auth";

document.addEventListener('DOMContentLoaded', function () {
    localStorage.removeItem("jwtToken");
    const form = document.getElementById("form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email")?.value;
        const password = document.getElementById("password")?.value;

        if (!email || !password) {
            alert("Por favor completa todos los campos");
            return;
        }

        try {
            await login(email, password);
        } catch (error) {
            console.error("Error en login:", error);
        }
    });
});

async function login(email, password) {
    try {
        const response = await axios.post(BASE_URL + "/login", {
            email: email,
            password: password
        });

        const token = response.data.token;
        localStorage.setItem('jwtToken', token);
        window.location.href = "/greeting.html";

        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                errorMessage = "Usuario o contraseña incorrectos";
            } else if (error.response.status === 400) {
                errorMessage = "Datos inválidos";
            } else if (error.response.status === 500) {
                errorMessage = "Error del servidor";
            } else {
                errorMessage = "Error: " + error.response.status;
            }
        } else if (error.request) {
            errorMessage = "Error de conexión con el servidor";
        } else {
            errorMessage = "Error: " + error.message;
        }
        alert("Error: " + errorMessage);
        throw error;
    }
}



