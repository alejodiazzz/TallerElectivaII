document.addEventListener('DOMContentLoaded', () => {
    let jwtToken = localStorage.getItem('jwtToken') || '';
    const jwtTokenSpan = document.getElementById('jwtToken');
    if (jwtTokenSpan) {
        jwtTokenSpan.textContent = jwtToken ? jwtToken : 'No hay token';
    }

    function displayResponse(data) {
        const apiResponse = document.getElementById('apiResponse');
        if (apiResponse) {
            apiResponse.textContent = JSON.stringify(data, null, 2);
        }
    }

    window.copyToken = function() {
        if (!jwtToken) {
            alert('No hay token para copiar.');
            return;
        }
        navigator.clipboard.writeText(jwtToken);
        alert('Token copiado al portapapeles!');
    }

    async function makeApiRequest(url, method, body = null, requiresAuth = true) {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (requiresAuth) {
            if (!jwtToken) {
                alert('Esta acción requiere un token JWT. Por favor, inicie sesión.');
                return null;
            }
            headers['Authorization'] = `Bearer ${jwtToken}`;
        }

        const options = {
            method,
            headers,
            body: body ? JSON.stringify(body) : null,
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            displayResponse(data);
            return data;
        } catch (error) {
            console.error('Error en la solicitud API:', error);
            displayResponse({ error: 'Error en la solicitud API', details: error.message });
            return null;
        }
    }

    // --- Autenticación ---
    document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;
        await makeApiRequest('/api/usuarios/register', 'POST', { username, password }, false);
    });

    document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        const response = await makeApiRequest('/api/auth/login', 'POST', { username, password }, false);
        if (response && response.token) {
            jwtToken = response.token;
            localStorage.setItem('jwtToken', jwtToken);
            document.getElementById('jwtToken').textContent = jwtToken;
            alert('Login exitoso! Token guardado.');
        }
    });

    // --- Cines ---
    document.getElementById('createCineForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = document.getElementById('cineNombre').value;
        const ubicacion = document.getElementById('cineUbicacion').value;
        const capacidad = parseInt(document.getElementById('cineCapacidad').value);
        await makeApiRequest('/api/cines', 'POST', { nombre, ubicacion, capacidad });
    });

    document.getElementById('listCinesBtn')?.addEventListener('click', async () => {
        const data = await makeApiRequest('/api/cines', 'GET');
        const cinesList = document.getElementById('cinesList');
        if (data && data.state) {
            cinesList.textContent = JSON.stringify(data.data, null, 2);
        } else {
            cinesList.textContent = JSON.stringify(data, null, 2);
        }
    });

    // --- Películas ---
    document.getElementById('createPeliculaForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const titulo = document.getElementById('peliculaTitulo').value;
        const genero = document.getElementById('peliculaGenero').value;
        const duracion = parseInt(document.getElementById('peliculaDuracion').value);
        const cineId = document.getElementById('peliculaCineId').value;
        await makeApiRequest('/api/peliculas', 'POST', { titulo, genero, duracion, cineId });
    });

    document.getElementById('listPeliculasBtn')?.addEventListener('click', async () => {
        const data = await makeApiRequest('/api/peliculas', 'GET');
        const peliculasList = document.getElementById('peliculasList');
        if (data && Array.isArray(data.data)) {
             peliculasList.textContent = JSON.stringify(data.data, null, 2);
        } else if (data && Array.isArray(data)) {
             peliculasList.textContent = JSON.stringify(data, null, 2);
        }
        else {
             peliculasList.textContent = JSON.stringify(data, null, 2);
        }
    });

    // --- GESTIONAR PELÍCULA POR ID ---
    const searchPeliculaForm = document.getElementById('searchPeliculaForm');
    const editPeliculaSection = document.getElementById('editPeliculaSection');
    const editPeliculaForm = document.getElementById('editPeliculaForm');
    const deletePeliculaBtn = document.getElementById('deletePeliculaBtn');

    if (searchPeliculaForm) {
        searchPeliculaForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const id = document.getElementById('searchPeliculaId').value;
            if (!id) return;

            const result = await makeApiRequest(`/api/peliculas/${id}`, 'GET');

            if (result && result.state && result.data) {
                const pelicula = result.data;
                document.getElementById('editPeliculaId').value = pelicula._id;
                document.getElementById('editPeliculaTitulo').value = pelicula.titulo;
                document.getElementById('editPeliculaGenero').value = pelicula.genero;
                document.getElementById('editPeliculaDuracion').value = pelicula.duracion;
                document.getElementById('editPeliculaCineId').value = pelicula.cineId._id || pelicula.cineId;
                editPeliculaSection.classList.remove('d-none');
            } else {
                editPeliculaSection.classList.add('d-none');
                alert('Película no encontrada.');
            }
        });
    }

    if (editPeliculaForm) {
        editPeliculaForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const id = document.getElementById('editPeliculaId').value;
            const body = {
                titulo: document.getElementById('editPeliculaTitulo').value,
                genero: document.getElementById('editPeliculaGenero').value,
                duracion: parseInt(document.getElementById('editPeliculaDuracion').value),
                cineId: document.getElementById('editPeliculaCineId').value,
            };

            const result = await makeApiRequest(`/api/peliculas/${id}`, 'PUT', body);
            if (result && result.state) {
                alert('Película actualizada con éxito.');
            } else {
                alert('Error al actualizar la película.');
            }
        });
    }

    if (deletePeliculaBtn) {
        deletePeliculaBtn.addEventListener('click', async () => {
            const id = document.getElementById('editPeliculaId').value;
            if (!confirm(`¿Estás seguro de que quieres eliminar la película con ID: ${id}?`)) {
                return;
            }

            const result = await makeApiRequest(`/api/peliculas/${id}`, 'DELETE');
            if (result && result.state) {
                alert('Película eliminada con éxito.');
                editPeliculaSection.classList.add('d-none');
            } else {
                alert('Error al eliminar la película.');
            }
        });
    }
});
