// ----------------------
// Регистрация
// ----------------------
document.getElementById('register').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    const password2 = document.getElementById('reg-password2').value;
    const errorEl = document.getElementById('reg-error');

    errorEl.innerText = '';

    if (!name || !email || !password || !password2) {
        errorEl.innerText = 'Заполните все поля!';
        return;
    }

    if (password !== password2) {
        errorEl.innerText = 'Пароли не совпадают!';
        return;
    }

    try {
        const res = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, confirmPassword: password2 })
        });

        console.log('Register HTTP status:', res.status);

        const data = await res.json();
        console.log('Register response:', data);

        if (res.ok) {
            // Сохраняем токен
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);

            alert('Регистрация успешна!');

            if (data.role === 'admin') {
                window.location.href = '/admin.html';
            } else {
                window.location.href = '/';
            }
        } else {
            errorEl.innerText = data.message || 'Ошибка при регистрации';
        }
    } catch (err) {
        console.error('Register fetch error:', err);
        errorEl.innerText = 'Сервер недоступен. Попробуйте позже.';
    }
});

// ----------------------
// Вход
// ----------------------
document.getElementById('login').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const errorEl = document.getElementById('login-error');

    errorEl.innerText = '';

    if (!email || !password) {
        errorEl.innerText = 'Заполните все поля!';
        return;
    }

    try {
        const res = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        console.log('Login HTTP status:', res.status);

        const data = await res.json();
        console.log('Login response:', data);

        if (res.ok) {
            // Сохраняем токен
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);

            alert('Вход выполнен успешно!');

            if (data.role === 'admin') {
                window.location.href = '/admin.html';
            } else {
                window.location.href = '/';
            }
        } else {
            errorEl.innerText = data.message || 'Ошибка при входе';
        }
    } catch (err) {
        console.error('Login fetch error:', err);
        errorEl.innerText = 'Сервер недоступен. Попробуйте позже.';
    }
});
// ----------------------
// Переключение вкладок
// ----------------------
const registerTab = document.getElementById('register-tab');
const loginTab = document.getElementById('login-tab');

const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');

registerTab.addEventListener('click', () => {
    registerForm.style.display = 'block';
    loginForm.style.display = 'none';
});

loginTab.addEventListener('click', () => {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
});