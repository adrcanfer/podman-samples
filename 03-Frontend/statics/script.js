const apiUrl = 'http://localhost:8082/hero'; // Cambia la URL según sea necesario

// Function to obtener la lista de héroes desde el backend
async function getHeroes() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching heroes:', error);
        return [];
    }
}

// Function to renderizar la tabla con los héroes
async function renderTable() {
    const heroesData = await getHeroes();
    const tableBody = document.getElementById('heroesTableBody');
    tableBody.innerHTML = '';

    heroesData.forEach(hero => {
        const row = `<tr>
                        <td>${hero.id}</td>
                        <td>${hero.name}</td>
                        <td>
                            <button class="btn btn-warning" onclick="editHero(${hero.id})">Edit</button>
                            <button class="btn btn-danger" onclick="deleteHero(${hero.id})">Delete</button>
                        </td>
                    </tr>`;
        tableBody.innerHTML += row;
    });
}

// Function to agregar un nuevo héroe
async function addHero(event) {
    event.preventDefault();
    const heroName = document.getElementById('heroName').value;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: heroName }),
        });

        if (response.ok) {
            await renderTable();
            document.getElementById('addHeroForm').reset();
        } else {
            console.error('Error adding hero:', response.statusText);
        }
    } catch (error) {
        console.error('Error adding hero:', error);
    }
}

// Function to editar un héroe
async function editHero(heroId) {
    try {
        const response = await fetch(`${apiUrl}/${heroId}`);
        const hero = await response.json();

        if (response.ok) {
            document.getElementById('editHeroId').value = hero.id;
            document.getElementById('editHeroName').value = hero.name;
            document.getElementById('editHeroForm').style.display = 'block';
            document.getElementById('addHeroForm').style.display = 'none';
            document.getElementById('editHeroForm').onsubmit = function (event) {
                event.preventDefault();
                const editedHeroName = document.getElementById('editHeroName').value;
                editHeroRequest(heroId, editedHeroName);
            };
        } else {
            console.error('Error fetching hero details:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching hero details:', error);
    }
}

// Function to realizar la solicitud para editar un héroe
async function editHeroRequest(heroId, editedHeroName) {
    try {
        const response = await fetch(`${apiUrl}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: editedHeroName, id: heroId }),
        });

        if (response.ok) {
            await renderTable();
            cancelEdit();
        } else {
            console.error('Error editing hero:', response.statusText);
        }
    } catch (error) {
        console.error('Error editing hero:', error);
    }
}

// Function to cancelar la edición
function cancelEdit() {
    document.getElementById('editHeroForm').style.display = 'none';
    document.getElementById('addHeroForm').style.display = 'block';
    document.getElementById('editHeroForm').reset();
}

// Function to borrar un héroe
async function deleteHero(heroId) {
    try {
        const response = await fetch(`${apiUrl}/${heroId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            await renderTable();
        } else {
            console.error('Error deleting hero:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting hero:', error);
    }
}

// Población inicial de la tabla
document.addEventListener('DOMContentLoaded', async function () {
    await renderTable();

    // Agrega un event listener al formulario
    document.getElementById('addHeroForm').addEventListener('submit', addHero);
});
