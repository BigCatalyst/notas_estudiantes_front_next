import { apiAuth } from "../api";

export interface StudentNoteRes {
  count: number;
  next: string;
  previous: string;
  results: StudentNote[];
}

export interface StudentNote {
  id?: number;
  asc: number;
  final_grade: number;
  final_exam: number;
  tcp1: number;
  tcp2: number;
  student: number;
  subject: number;
  school_year: number;
}

export const studentsNote = async (
  query: string
): Promise<StudentNoteRes | undefined> => {
  try {
    const response = await apiAuth.get(`student_note/?${query}`);
    const data: StudentNoteRes = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addStudentNote = async (
  value: StudentNote
): Promise<StudentNote | undefined> => {
  try {
    const response = await apiAuth.post(`student_note/`, value);
    const data: StudentNote = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateStudentNote = async (
  id: number,
  value: StudentNote
): Promise<StudentNote | undefined> => {
  try {
    const response = await apiAuth.patch(`student_note/${id}/`, value);
    const data: StudentNote = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteCareer = async (id: number) => {
  try {
    const response = await apiAuth.delete(`student_note/${id}/`);

    const data = response.data;

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
