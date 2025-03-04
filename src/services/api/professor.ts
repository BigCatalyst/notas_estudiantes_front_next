import { apiAuth } from "../api";

export interface ProfessorRes {
  count: number;
  next: string;
  previous: string;
  results: ProfessorType[];
}

export interface ProfessorType {
  id?: number;
  ci: string;
  address: string;
  last_name: string;
  first_name: string;
  sex: string;
  user?: number;
  account?: Account;
}

export interface Account {
  username: string;
  password?: string;
  email: string;
}

export const professors = async (
  query: string
): Promise<ProfessorRes | undefined> => {
  try {
    const response = await apiAuth.get(`professor/?${query}`);
    const data: ProfessorRes = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const professorsAll = async (
  query: string
): Promise<ProfessorType[] | undefined> => {
  try {
    const response = await apiAuth.get(`professor/?paginate=false&${query}`);
    const data: ProfessorType[] = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addProfessor = async (
  value: ProfessorType
): Promise<ProfessorType | undefined> => {
  try {
    const response = await apiAuth.post(`professor/`, value);
    const data: ProfessorType = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateProfessor = async (
  id: string,
  value: ProfessorType
): Promise<ProfessorType | undefined> => {
  try {
    const response = await apiAuth.patch(`professor/${id}/`, value);
    const data: ProfessorType = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteProfessor = async (id: number) => {
  try {
    const response = await apiAuth.delete(`professor/${id}/`);
    const data = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getProfessor = async (
  id: string
): Promise<ProfessorType | undefined> => {
  try {
    const response = await apiAuth.get(`professor/${id}/`);
    const data: ProfessorType = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
