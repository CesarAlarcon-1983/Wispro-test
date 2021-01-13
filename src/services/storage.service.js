export function getUsers() {
  let storedUsers = localStorage.getItem('users');

  if(storedUsers) {
    storedUsers = JSON.parse(storedUsers);
  } else {
    storedUsers = [];
  }

  return storedUsers;
}

export function storeUser(userData) {
    localStorage.setItem('users', JSON.stringify(userData))
}

export function storeToken(token) {
  localStorage.setItem('token', token)
}

export function getToken() {
  return localStorage.getItem('token');
}

export function deleteToken() {
  localStorage.removeItem('token');
}

