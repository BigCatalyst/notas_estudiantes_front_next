/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FileType,
  SectionType,
} from "@/components/dashboard/virtual_classroom_edition/Types";
import { apiAuth } from "../api";

export interface SubjectSectionSubjectsRes {
  id: number;
  professor: ProfessorType[];
  grade: number;
  name: string;
  tcp2_required: boolean;
}

export interface ProfessorType {
  id: number;
  ci: string;
  address: string;
  last_name: string;
  first_name: string;
  sex: string;
  user: number;
}

export const subjects_sections_subjects = async (
  query: string
): Promise<SubjectSectionSubjectsRes[] | undefined> => {
  try {
    const response = await apiAuth.get(`subject_section/subjects/?${query}`);
    const data: SubjectSectionSubjectsRes[] = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const subject_section_create_data = async (
  id: string
): Promise<SectionType[] | undefined> => {
  try {
    const response = await apiAuth.get(`subject_section/create/${id}/`);
    const data: SectionType[] = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const subject_section_create_Add = async (
  id: string,
  dataSection: SectionType[]
) => {
  try {
    const response = await apiAuth.post(
      `subject_section/create/${id}/`,
      dataSection
    );
    const data = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

///api/subject_section/responses/{id}/

export interface SectionResponseRes {
  id: number;
  student: Student;
  description: string;
  files: File[];
}

export interface File {
  id: number;
  title: string;
  description: string;
  file: string;
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
  user: number;
}

export const subject_section_responses = async (
  id: string
): Promise<SectionResponseRes[] | undefined> => {
  try {
    const response = await apiAuth.get(`subject_section/responses/${id}/`);
    const data: SectionResponseRes[] = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export interface ResponseTastRes {
  id?: number;
  student: Student;
  description: string;
  school_task: number;
  files: File[];
}

export const student_response_task = async (
  id: string
): Promise<ResponseTastRes | undefined> => {
  try {
    const response = await apiAuth.get(`student_response/of_student/${id}/`);
    const data: ResponseTastRes = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export interface DataStudentResponseTask {
  description: string;
  files: FileType[];
  school_task?: number;
  student?: number;
}

export const update_student_response_task = async (
  id: string,
  data: DataStudentResponseTask
) => {
  try {
    const response = await apiAuth.put(`/student_response/${id}/`, data);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const add_student_response_task = async (
  data: DataStudentResponseTask
) => {
  try {
    const response = await apiAuth.post(`/student_response/`, data);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
