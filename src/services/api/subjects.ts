import { apiAuth } from "../api";

//subjects
export interface SubjectsRes {
  count: number;
  next: string;
  previous: string;
  results: Subject[];
}

export interface Subject {
  id?: number;
  grade: number;
  name: string;
  tcp2_required: boolean;
}

export const subjects = async (query: string): Promise<Subject | undefined> => {
  try {
    const response = await apiAuth.get(`subjects/?${query}`);
    const data: Subject = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addSubject = async (
  value: Subject
): Promise<Subject | undefined> => {
  try {
    const response = await apiAuth.post(`subjects/`, value);
    const data: Subject = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateSubject = async (
  id: number,
  value: Subject
): Promise<Subject | undefined> => {
  try {
    const response = await apiAuth.patch(`subjects/${id}/`, value);
    const data: Subject = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteSubject = async (id: number) => {
  try {
    const response = await apiAuth.delete(`careers/${id}/`);

    const data = response.data;

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
