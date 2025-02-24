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
  grade: string;
  name: string;
  tcp2_required: boolean;
}

export const subjects = async (
  query: string
): Promise<SubjectsRes | undefined> => {
  try {
    const response = await apiAuth.get(`subjects/?${query}`);
    const data: SubjectsRes = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const subjectsAll = async (
  query: string
): Promise<Subject[] | undefined> => {
  try {
    const response = await apiAuth.get(`subjects/?paginate=false&${query}`);
    const data: Subject[] = response.data;
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
  id: string,
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
    const response = await apiAuth.delete(`subjects/${id}/`);

    const data = response.data;

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getSubject = async (id: string): Promise<Subject | undefined> => {
  try {
    const response = await apiAuth.get(`subjects/${id}/`);

    const data: Subject = response.data;

    // data.grade=Number(data.grade);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};