import { User } from "../types";
import { apiClient } from "../utils/apiClient";
import axios from "axios";

const userApi = () => {
  const registerUser = async (user: User): Promise<User> => {
    try {
      const response = await apiClient.post("user/register", user);
      if (response.success) {
        return response.responseObject;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { message } = error.response?.data || {};
        throw message;
      } else {
        throw new Error("Something went wrong while registering user");
      }
    }
    throw new Error("Something went wrong while registering user");
  };

  const loginUser = async (user: User): Promise<User> => {
    try {
      const response = await apiClient.post("user/login", user);
      if (response.success) {
        return response.responseObject;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { message } = error.response?.data || {};
        throw message;
      } else {
        throw error;
      }
    }
    throw new Error("Something went wrong while logging in user");
  };

  return { registerUser, loginUser };
};

export default userApi;
