import axios from "axios";

const API_URL = "http://localhost:5000/";

export const forgottenPassword = async (email) => {
  const response = await axios.post(`${API_URL}users/forgotpassword`, {
    email,
  });
  return response.data;
};

export const passwordReset = async (token, password, confPassword) => {
  const response = await axios.post(`${API_URL}resetpassword/${token}`, {
    password,
    confPassword,
  });
  return response.data;
};

export const countUpViews = async (id) => {
  const response = await axios.post(`${API_URL}user/views/${id}`);
  return response.data;
};

export const countTotalViews = async (id) => {
  const response = await axios.get(`${API_URL}user/fame/${id}`);
  return response.data;
};

export const getPicture = async (id) => {
  const response = await axios.get(`${API_URL}user/pictures/${id}`);
  return response.data;
};

export const uploadPicture = async (formData) => {
  const response = await axios.post(`${API_URL}upload`, formData);
  return response.data;
};

export const uploadProfilePicture = async (formData) => {
  const response = await axios.post(`${API_URL}upload/profilePic`, formData);
  return response.data;
};

export const deletePicture = async (id) => {
  const response = await axios.delete(`${API_URL}user/picture/${id}`);
  return response.data;
};

export const getMatch = async (id) => {
  const response = await axios.get(`${API_URL}users/${id}`);
  return response.data;
};

export const checkLiked = async (id, id2) => {
  const response = await axios.get(`${API_URL}liked/${id}/${id2}`);
  return response.data;
};

export const blockUser = async (id, id2) => {
  const response = await axios.post(`${API_URL}block/${id}/${id2}`);
  return response.data;
};

export const handleLikeDislike = async (id, id2) => {
  const response = await axios.post(`${API_URL}like/${id}/${id2}`);
  return response.data;
};

export const reportUser = async (id, id2) => {
  const response = await axios.post(`${API_URL}report/${id}/${id2}`);
  return response.data;
};
