// AuthService.js
import axios from "axios";

const loginUser = async (credentials) => {
  console.log(credentials);
  try {
    const response = await axios.post(
      "localhost:8000/api/auth/login",
      credentials
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const AuthService = { loginUser };
