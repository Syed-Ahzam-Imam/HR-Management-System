import axios from "axios";
export const BASE_URL = "https://backendhr.sysartx.com";
export const BASE_URL_FRONTEND = "http://localhost:3001";

export const vatTax = 5 / 100;
const token = localStorage.getItem("token");


export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/login`,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};