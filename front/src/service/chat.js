import axios from "axios";

const API_URL = "http://localhost:5000/";

export const getConversations = async (id) => {
  const response = await axios.get(`${API_URL}newConvo/${id}`);
  return response.data;
};

export const getMessages = async (id) => {
  const response = await axios.get(`${API_URL}messages/${id}`);
  return response.data;
};

export const newMessages = async (message) => {
  const response = await axios.post(`${API_URL}messages`, message);
  return response.data;
};

export const markAsSeen = async (id) => {
  const response = await axios.post(API_URL + `messages/seen/${id}`);
  return response.data;
};

export const getMatch = async (id) => {
  const response = await axios.get(`${API_URL}users/${id}`);
  return response.data;
};
