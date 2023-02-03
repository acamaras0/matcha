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
