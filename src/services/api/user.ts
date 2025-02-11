/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiAuth } from "../api";

export const update = async (user: any): Promise<ResUsers | undefined> => {
  try {
    const response = await apiAuth.patch(`users/${user?.id}/`, user);

    const data: ResUsers = response.data;

    return data;
  } catch (error) {
    console.log(error);
  }
};

export interface ResUsers {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  groups: Group[];
  is_superuser: boolean;
}

export interface Group {
  id: number;
  name: string;
}
