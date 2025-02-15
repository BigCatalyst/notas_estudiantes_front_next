/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  User,
  UsersDashboardResponse,
} from "@/components/dashboard/users/Types";
import { apiAuth } from "../api";
import { GroupRes } from "../Types";

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
    return Promise.reject(error);
  }
};

export const updUser = async (
  id: any,
  user: User
): Promise<User | undefined> => {
  try {
    console.log(user);
    const response = await apiAuth.patch(`users/${id}/`, user);

    const data: User = response.data;

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUser = async (id: string): Promise<User | undefined> => {
  try {
    const response = await apiAuth.get(`users/${id}/`);

    const data: User = response.data;

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getRoles = async (): Promise<string[] | undefined> => {
  try {
    const response = await apiAuth.get(`groups/`);

    const data: GroupRes = response.data;

    const roles = data.results.map((item) => item.name);

    return roles;
  } catch (error) {
    return Promise.reject(error);
  }
};
