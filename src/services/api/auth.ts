import {
  api,
  apiAuth,
  DJANGO_AUTH_REFRESH_TOKEN,
  DJANGO_AUTH_TOKEN,
} from "../api";
import { AuthVerify } from "../Types";
const USER_URL = "users";
const TOKEN_URL = "token";

export const me = async (): Promise<AuthVerify> => {
  const response = await apiAuth.get(`${USER_URL}/me/`);
  const data: AuthVerify = response.data;

  return data;
};

export async function loguin(username: string, password: string) {
  const response = await api.post(`${TOKEN_URL}/`, {
    username: username,
    password: password,
  });
  console.log(response);
  if (response.status == 200) {
    localStorage.setItem(DJANGO_AUTH_TOKEN, response.data.access);
    localStorage.setItem(DJANGO_AUTH_REFRESH_TOKEN, response.data.refresh);
    localStorage.setItem("current_user_id", response.data.user.pk);
  }
  return response;
}

export async function logout(
  params: {
    redirectToLogin?: boolean;
    msg?: string;
    callLogout?: boolean;
  } = {}
) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { redirectToLogin = false, msg = null, callLogout = true } = params;

    const refreshToken = localStorage.getItem(DJANGO_AUTH_REFRESH_TOKEN); // Obtén el token de refresco

    if (callLogout) {
      // Llama al endpoint de logout
      await apiAuth.post(`${TOKEN_URL}/logout/`, {
        refresh: refreshToken,
      });
    }

    // Elimina los tokens del almacenamiento local
    localStorage.removeItem(DJANGO_AUTH_TOKEN);
    localStorage.removeItem(DJANGO_AUTH_REFRESH_TOKEN);

    if (redirectToLogin) {
      window.location.href = "/login";
    }
  } catch (error) {
    console.error("Error al hacer logout:", error);
    // Puedes manejar errores aquí, como mostrar un mensaje al usuario
  }
}
