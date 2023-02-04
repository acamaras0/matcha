import axios from "axios";

const API_URL = "http://localhost:5000/";

export const updatePassword = async (id, password, passwordConfirm) => {
  const response = await axios.post(`${API_URL}user/updatePassword/${id}`, {
    password,
    passwordConfirm,
  });
  return response.data;
};

export const updateUserInfo = async (
  id,
  firstName,
  lastName,
  username,
  email,
  bio,
  interests,
  gender,
  orientation,
  geoLat,
  geoLng,
  city,
  country,
  birthdate
) => {
  const response = await axios.post(`${API_URL}user/update/${id}`, {
    firstName,
    lastName,
    username,
    email,
    bio,
    interests,
    gender,
    orientation,
    geoLat,
    geoLng,
    city,
    country,
    birthdate,
  });
  return response.data;
};
