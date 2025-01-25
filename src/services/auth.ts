import { api, DJANGO_AUTH_TOKEN } from "./api";

export default async function loguin(username: str, password: str) {
  const response = await api.post("/api/token/", {
    username: username,
    password: password,
  });
  console.log(response);
  if (response.status == 200) {
    localStorage.setItem(DJANGO_AUTH_TOKEN, response.data.access);
    localStorage.setItem("django_refresh_token", response.data.refresh);
    localStorage.setItem("current_user_id", response.data.user.pk);
  }
  return response;
}
