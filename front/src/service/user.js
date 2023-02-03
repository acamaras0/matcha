import axios from "axios";

const API_URL = "http://localhost:5000/";

export const countUpViews = async (id) => {
  const response = await axios.get(`${API_URL}user/views/${id}`);
  return response.data;
};

export const forgottenPassword = async (email) => {
  const response = await axios.post(`${API_URL}users/forgotpassword`, {
    email,
  });
  return response.data;
}