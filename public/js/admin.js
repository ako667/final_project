const token = localStorage.getItem('token');
if (!token) {
  alert('Пожалуйста, войдите в аккаунт');
  window.location.href = '/account.html';
} else {
  const payload = JSON.parse(atob(token.split('.')[1]));
  if (payload.role !== 'admin') {
    alert('Доступ только для админа!');
    window.location.href = '/';
  }
}

const cakeList = document.getElementById('cake-list');

async function loadCakes() {
  const res = await fetch('/api/cakes');
  const cakes = await res.json();
  cakeList.innerHTML = '';

  cakes.forEach(cake => {
    const div = document.createElement('div');
    div.className = 'cake-item';
    div.innerHTML = `
      <img src="${cake.image}" alt="${cake.name}" />
      <div class="cake-info">
        <strong>${cake.name}</strong>
        <small>${cake.price} ₸ — ${cake.description}</small>
      </div>
      <div class="btn-group">
        <button class="btn-edit" onclick="editCake('${cake._id}')">✏️ Edit</button>
        <button class="btn-delete" onclick="deleteCake('${cake._id}')">❌ Delete</button>
      </div>
    `;
    cakeList.appendChild(div);
  });
}

loadCakes();

document.getElementById('add-cake').addEventListener('click', async () => {
  const name = document.getElementById('cake-name').value.trim();
  const price = Number(document.getElementById('cake-price').value);
  const description = document.getElementById('cake-description').value.trim();
  const image = document.getElementById('cake-image').value.trim();

  if (!name || !price || !description || !image) {
    alert('Пожалуйста, заполните все поля!');
    return;
  }

  const res = await fetch('/api/cakes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ name, price, description, image })
  });

  if (res.ok) {
    alert('Торт добавлен!');
    document.getElementById('cake-name').value = '';
    document.getElementById('cake-price').value = '';
    document.getElementById('cake-description').value = '';
    document.getElementById('cake-image').value = '';
    loadCakes();
  } else {
    const data = await res.json();
    alert(data.message || 'Ошибка при добавлении');
  }
});

async function deleteCake(id) {
  const res = await fetch(`/api/cakes/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer ' + token }
  });

  if (res.ok) {
    alert('Торт удалён!');
    loadCakes();
  } else {
    const data = await res.json();
    alert(data.message || 'Ошибка при удалении');
  }
}

// Реализация editCake остаётся на твоё усмотрение, если нужна — могу помочь
function editCake(id) {
  alert('Функция редактирования пока не реализована');
}
