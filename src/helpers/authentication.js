export function userToken() {
  return localStorage.getItem('rtracker-jwt-token');
}

export function isUserLoggedIn() {
  return userToken() !== null;
}

export function clearToken() {
  localStorage.removeItem('rtracker-jwt-token');
}