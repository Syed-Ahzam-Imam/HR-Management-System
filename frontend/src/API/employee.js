import axios from "axios";
export const BASE_URL = "https://backendhr.sysartx.com";
export const BASE_URL_FRONTEND = "http://localhost:3001";

export const vatTax = 5 / 100;
const token = localStorage.getItem("token");


export async function getAllEmployees() {
  try {
    const response = await axios.get(`${BASE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data; // Return the data from the API response
  } catch (error) {
    throw error;
  }
}

export async function deleteEmployeeById(employeeId) {
  try {
    const response = await axios.delete(
      `${BASE_URL}/user/${employeeId}`
    );
    return response.data; // Return the data from the API response
  } catch (error) {
    throw error;
  }
}

export const createEmployee = async (employeeData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/signup`,
      employeeData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // Return the response data
  } catch (error) {
    throw error;
  }
};


export const updateEmployee = async (id, updatedData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/user/${id}`,
      updatedData,
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


export const uploadProfilePicture = async (ProfileFormData, userId) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/${userId}/profile-picture`, ProfileFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    throw error;
  }
};
