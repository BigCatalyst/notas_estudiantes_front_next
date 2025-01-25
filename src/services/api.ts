import { API_URL } from "@/config";
import axios from "axios";
export const DJANGO_AUTH_TOKEN = "django_auth_token";
export const api = axios.create({
  baseURL: API_URL, // Reemplaza con la URL de tu API
});

export const apiAuth = axios.create({
  baseURL: API_URL, // Reemplaza con la URL de tu API
  headers: {
    "Content-Type": "application/json",
  },
});

apiAuth.interceptors.request.use(
  (config) => {
    // Puedes agregar lógica aquí para incluir tokens de autenticación, etc.
    const token = localStorage.getItem(DJANGO_AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Si es un error 401 (no autorizado), se puede hacer algo como redireccionar al login
      localStorage.removeItem(DJANGO_AUTH_TOKEN);
      window.location.href = "/login?message=no+estas+logueado";
    }
    return Promise.reject(error);
  }
);

// export const getMyData = async () => {
//   try {
//     const response = await api.get("/mi-endpoint");
//     return response.data;
//   } catch (error) {
//     throw new Error("Error al obtener los datos");
//   }
// };

// export const postMyData = async (data: any) => {
//   try {
//     const response = await api.post("/mi-endpoint", data);
//     return response.data;
//   } catch (error) {
//     throw new Error("Error al guardar los datos");
//   }
// };
