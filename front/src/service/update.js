import axios from "axios";

const API_URL = "http://localhost:5000/";

export const updatePassword = async (id, password, passwordConfirm) => {
  const response = await axios.post(`${API_URL}user/updatePassword/${id}`, {
    password,
    passwordConfirm,
  });
  return response.data;
};
