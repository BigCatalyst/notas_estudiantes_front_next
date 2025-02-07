import { apiAuth } from "../api";
import { AuthVerify } from "../Types";
const USER_URL = "users";

export const me = async (): Promise<AuthVerify> => {
  const response = await apiAuth.get(`${USER_URL}/me/`);
  const data: AuthVerify = response.data;

  return data;
};
