import axios from "axios";

const API_URL = "http://localhost:5000/";

export const markAsRead = async (id) => {
  const response = await axios.post(API_URL + `user/mark/${id}`);
  return response.data;
};

export const markAsSeen = async (id) => {
  const response = await axios.post(API_URL + `messages/seen/${id}`);
  return response.data;
};
