/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  User,
  UsersDashboardResponse,
} from "@/components/dashboard/users/Types";
import { apiAuth } from "../api";

export const update = async (user: User): Promise<User | undefined> => {
  try {
    const response = await apiAuth.patch(`users/${user?.id}/`, user);

    const data: User = response.data;

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

export const addUser = async (user: User): Promise<User | undefined> => {
  try {
    const response = await apiAuth.post(`users/`, user);

    const data: User = response.data;

    return data;
  } catch (error) {
    console.log(error);
  }
};
