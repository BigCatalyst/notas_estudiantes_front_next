/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiAuth } from "../api";

export interface StudentNoteRes {
  count: number;
  next: string;
  previous: string;
  results: StudentNote[];
}

export interface StudentNote {
  id?: number;
  asc?: number;
  final_grade?: number;
  final_exam?: number;
  tcp1?: number;
  tcp2?: number;
  student?: any;
  subject: any;
  school_year: any;
}

export interface SubjectInNote {
  id: number;
  grade: number;
  name: string;
  tcp2_required: boolean;
  professor: number[];
}
export interface SchoolYearInNote {
  id: number;
  start_date: string;
  end_date: string;
  name: string;
}

export interface StudentNoteMultipleByStudent {
  id?: number;
  asc?: number;
  final_grade?: number;
  final_exam?: number;
  tcp1?: number;
  tcp2?: number;
  student: number;
  subject: SubjectInNote;
  school_year: SchoolYearInNote;
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
  id: string,
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

export const deleteStudentNote = async (id: number) => {
  try {
    const response = await apiAuth.delete(`student_note/${id}/`);

    const data = response.data;

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getStudentNote = async (
  id: string
): Promise<StudentNote | undefined> => {
  try {
    const response = await apiAuth.get(`student_note/${id}/`);

    const data: StudentNote = response.data;

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const studentsNoteMultiple = async (
  id: string
): Promise<StudentNote[] | undefined> => {
  try {
    const response = await apiAuth.get(`/student_note/multiple/${id}/`);
    const data: StudentNote[] = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const SaveStudentsNoteEdit = async (data: StudentNote[]) => {
  try {
    const response = await apiAuth.post(`/student_note/multiple/`, data);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const studentsNoteMultipleByStudent = async (
  id: string
): Promise<StudentNoteMultipleByStudent[] | undefined> => {
  try {
    const response = await apiAuth.get(
      `/student_note/multiple/bySudent/${id}/`
    );
    const data: StudentNoteMultipleByStudent[] = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
