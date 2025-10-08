const BASE_URL = "https://secure-app-back.duckdns.org/auth";

function showLoginRequired(){
    document.querySelector('.content').style.display = 'none'; 
    document.querySelector('.loginWarning').style.display = 'block';
}

async function checkAuthentication() {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        showLoginRequired();
        return;
    }

    try {
        const response = await axios.get(BASE_URL + "/greeting", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        document.querySelector('.content').style.display = 'block'; 
        document.querySelector('.loginWarning').style.display = 'none';
        document.getElementById('message').textContent = response.data;

    } catch (error) {
        alert('Error de autenticación:', error);
        showLoginRequired();
        localStorage.removeItem('jwtToken');
    }
}


document.addEventListener('DOMContentLoaded', function() {
    checkAuthentication();
});