async function register() {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: r-name.value,
      email: r-email.value,
      password: r-pass.value,
      confirmPassword: r-pass2.value
    })
  });

  const data = await res.json();
  if (!res.ok) return alert(data.message);

  localStorage.setItem('token', data.token);
  localStorage.setItem('role', data.role);
  location.href = 'index.html';
}

async function login() {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: l-email.value,
      password: l-pass.value
    })
  });

  const data = await res.json();
  if (!res.ok) return alert(data.message);

  localStorage.setItem('token', data.token);
  localStorage.setItem('role', data.role);
  location.href = 'index.html';
}