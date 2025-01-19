import axios from "axios";
import api from "./api";

export const loginUser = async (credentials:any) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error:any) {
        if(axios.isAxiosError(error)){
         throw new Error(error.response?.data.message || 'Error de autenticación');
        }
      throw new Error('Error de autenticación');
    }
  };

