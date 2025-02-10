import { API_URL } from "@/config";
import axios from "axios";
import { logout } from "./api/auth";

export const DJANGO_AUTH_TOKEN = "django_auth_token";
export const DJANGO_AUTH_REFRESH_TOKEN = "django_refresh_token";
// const TOKEN_URL = "token";

export const getToken = () => localStorage.getItem(DJANGO_AUTH_TOKEN);

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
      config.headers.Authorization = `Bearer ${getToken()}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// apiAuth.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // Si es un error 401 (no autorizado), se puede hacer algo como redireccionar al login
//       localStorage.removeItem(DJANGO_AUTH_TOKEN);
//       window.location.href = "/login?message=no+estas+logueado";
//     }
//     return Promise.reject(error);
//   }
// );

apiAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response) {
      if (error.response.status === 401) {
        // const retry=localStorage.getItem("retry_token")
        if (!originalRequest._retry) {
          originalRequest._retry = true;
          // localStorage.setItem("retry_token", "true");

          try {
            // Intenta refrescar el token de acceso
            callRefreshToken();
            // localStorage.removeItem("retry_token");

            // Reintenta la solicitud original con el nuevo token
            originalRequest.headers.Authorization = `Bearer ${getToken()}`;
            return apiAuth(originalRequest);
          } catch (refreshError) {
            // Si el refresco del token falla, haz logout
            logout({
              redirectToLogin: true,
              msg: "No estas logueado",
              callLogout: false,
            });

            return Promise.reject(refreshError);
          }
        } else {
          logout({
            redirectToLogin: true,
            msg: "No estas logueado",
            callLogout: false,
          });
        }
      }
    }

    return Promise.reject(error);
  }
);

// export async function loguin(username: string, password: string) {
//   const response = await api.post(`${TOKEN_URL}/`, {
//     username: username,
//     password: password,
//   });
//   console.log(response);
//   if (response.status == 200) {
//     localStorage.setItem(DJANGO_AUTH_TOKEN, response.data.access);
//     localStorage.setItem(DJANGO_AUTH_REFRESH_TOKEN, response.data.refresh);
//     localStorage.setItem("current_user_id", response.data.user.pk);
//   }
//   return response;
// }

// export async function logout(
//   params: {
//     redirectToLogin?: boolean;
//     msg?: string;
//     callLogout?: boolean;
//   } = {}
// ) {
//   try {
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const { redirectToLogin = false, msg = null, callLogout = true } = params;

//     const refreshToken = localStorage.getItem(DJANGO_AUTH_REFRESH_TOKEN); // Obtén el token de refresco

//     if (callLogout) {
//       // Llama al endpoint de logout
//       await apiAuth.post(`${TOKEN_URL}/logout/`, {
//         refresh: refreshToken,
//       });
//     }

//     // Elimina los tokens del almacenamiento local
//     localStorage.removeItem(DJANGO_AUTH_TOKEN);
//     localStorage.removeItem(DJANGO_AUTH_REFRESH_TOKEN);

//     if (redirectToLogin) {
//       window.location.href = "/login";
//     }
//   } catch (error) {
//     console.error("Error al hacer logout:", error);
//     // Puedes manejar errores aquí, como mostrar un mensaje al usuario
//   }
// }

export async function callRefreshToken() {
  const refreshToken = localStorage.getItem(DJANGO_AUTH_REFRESH_TOKEN);
  const response = await api.post(`token/refresh/`, {
    refresh: refreshToken,
  });

  const newAccessToken = response.data.access;

  // Actualiza el token de acceso en el almacenamiento local
  localStorage.setItem("access_token", newAccessToken);
}
