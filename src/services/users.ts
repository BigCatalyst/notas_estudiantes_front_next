import { apiAuth } from "./api";
const USER_URL = "users";
export async function me() {
  const response = await apiAuth.get(`/${USER_URL}/me/`);
  return response.data;
}
