import { apiAuth } from "../api";

//students
export interface StudentsRes {
  count: number;
  next: string;
  previous: string;
  results: Student[];
}

export interface Student {
  id: number;
  is_approved: boolean;
  ci: string;
  address: string;
  grade: number;
  last_name: string;
  first_name: string;
  registration_number: string;
  sex: string;
  is_graduated: boolean;
  is_dropped_out: boolean;
}

export const students = async (
  query: string
): Promise<StudentsRes | undefined> => {
  try {
    const response = await apiAuth.get(`students/?${query}`);
    const data: StudentsRes = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addStudent = async (
  value: Student
): Promise<Student | undefined> => {
  try {
    const response = await apiAuth.post(`students/`, value);
    const data: Student = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateStudent = async (
  id: number,
  value: Student
): Promise<Student | undefined> => {
  try {
    const response = await apiAuth.patch(`students/${id}/`, value);
    const data: Student = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteStudent = async (id: number) => {
  try {
    const response = await apiAuth.delete(`students/${id}/`);
    const data = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
