import axios from "axios";

const API_URL = "http://localhost:5000/";

export const login = async (username, password) => {
  const response = await axios.post(API_URL + "login", {
    username,
    password,
  });
  return response.data;
};

export const register = async (
  firstName,
  lastName,
  username,
  email,
  password,
  confPassword
) => {
  const response = await axios.post(API_URL + "users", {
    firstName,
    lastName,
    username,
    email,
    password,
    confPassword,
  });
  return response.data;
};

export const logout = async () => {
  const response = await axios.delete(API_URL + "logout");
  return response.data;
};

export const fill = async (birthdate, gender, orientation, interests, bio) => {
  const response = await axios.post(API_URL + "fill", {
    birthdate,
    gender,
    orientation,
    interests,
    bio,
  });
  return response.data;
};

export const getLoggedIn = async (cookie) => {
  const response = await axios.get(API_URL + `user/${cookie}`);
  return response.data;
};

export const activateAccount = async (hash) => {
  const response = await axios.post(API_URL + `activate/${hash}`);
  return response.data;
}
