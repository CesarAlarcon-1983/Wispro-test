import { getUsers, storeUser, storeToken, getToken, deleteToken } from './storage.service';

export async function doLogin(userData) {
  let authResponse = authMock(userData);
  console.log(authResponse)
  
  if(authResponse.success) {
    storeToken(authResponse.token);
    updateUserStatus(authResponse.userId, authResponse.token)
    return true;
  } else {
    return false;
  }
}

export async function doLogout(userId) {
  updateUserStatus(userId, null);
  deleteToken()
}

function authMock(userData) {
  let usersInDatabase = getUsers();
  
  let user = usersInDatabase.filter(user => user.email === userData.email)[0];
  
  if(user && user.pass === userData.pass) {
    return {
      success: true,
      message: 'Usuario loggeado',
      token: generateToken(20),
      userId: user.id
    }
  } else {
    return {
      success: false,
      message: 'Datos de usuario invalidos'
    }
  }
}

export function getActiveUser() {
  let token = getToken();
  let usersInDatabase = getUsers();
  let activeUser = usersInDatabase.filter(user => user.token === token)[0];
  return activeUser
}

function updateUserStatus(userId, token) {
  let usersInDatabase = getUsers();

  let userIndex = usersInDatabase.findIndex(user => {
   return user.id === userId
  });

  usersInDatabase[userIndex].token = token;
  console.log(usersInDatabase);
  storeUser(usersInDatabase);
}

function generateToken(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
 
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
 
  return result;
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export const generateChartData = (diasQty) => {
  let data = [];

  for(let i = 1; i < diasQty + 1; i++) {

    data.push({
      "dia": `${i}-12`,
      "cantidad": generateRandomNumber(1000, 2000)
    })
  }
  
  return data;
}

export const editUser = (userId, newName) => {
  let usersInDatabase = getUsers();

  let userIndex = usersInDatabase.findIndex(user => {
   return user.id === userId
  });

  usersInDatabase[userIndex].nombre = newName;
  storeUser(usersInDatabase);
}

