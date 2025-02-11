/* eslint-disable @typescript-eslint/no-explicit-any */
import { UsersDashboardResponse } from "@/components/dashboard/users/Types";
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

export const users = async (
  query: string
): Promise<UsersDashboardResponse | undefined> => {
  console.log(`users/?${query}`);
  try {
    const response = await apiAuth.get(`users/?${query}`);

    const data: UsersDashboardResponse = response.data;

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
