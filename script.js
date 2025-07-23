const BASE = 'https://hospitable-bravery-production.up.railway.app';
let currentUser = null;

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch(BASE + '/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }).then(res => res.json())
    .then(data => {
      if (data.error) return alert(data.error);
      currentUser = data.user;
      document.getElementById('login').style.display = 'none';
      document.getElementById('dashboard').style.display = 'block';
      document.getElementById('userInfo').innerText = `Logged in as: ${currentUser.username}`;
      if (currentUser.admin) document.getElementById('adminPanel').style.display = 'block';
    });
}

function logout() {
  location.reload();
}

function addUser() {
  const username = document.getElementById('newUser').value;
  const password = document.getElementById('newPass').value;
  const limit = parseInt(document.getElementById('newLimit').value);
  const time = parseInt(document.getElementById('newTime').value);
  const days = parseInt(document.getElementById('newDays').value);

  fetch(BASE + '/api/add-user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ adminUser: currentUser.username, username, password, limit, time, days })
  }).then(res => res.json()).then(data => {
    if (data.success) alert('User added!');
    else alert(data.error);
  });
}

function deleteUser() {
  const username = document.getElementById('delUser').value;
  fetch(BASE + '/api/delete-user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ adminUser: currentUser.username, username })
  }).then(res => res.json()).then(data => {
    if (data.success) alert('User deleted!');
    else alert(data.error);
  });
}

function attack() {
  const target = document.getElementById('target').value;
  const duration = parseInt(document.getElementById('duration').value);
  const method = document.getElementById('method').value;
  alert(`Simulated attack to ${target} via ${method} for ${duration} seconds.`);
}
