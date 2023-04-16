import axios from "axios";

const API_KEY = "AIzaSyCX5cIGMG23hoatqCPLZnSQJX_6klMLbRk";

async function authentication(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;

  return token;
}

export function createUser(email, password) {
  return authentication("signUp", email, password);
}

export function login(email, password) {
  return authentication("signInWithPassword", email, password);
}

export async function updateAccount(idToken, displayName, photoUrl = "") {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;

  const response = await axios.post(url, {
    idToken: idToken,
    displayName: displayName,
    photoUrl: photoUrl,
    returnSecureToken: true,
  });

  const token = response.data.idToken;

  return token;
}

export async function resetPassword(email) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`;

  const response = await axios.post(url, {
    requestType: "PASSWORD_RESET",
    email: email,
  });

  return response;
}
