import { apiAuth } from "../api";

export interface StudentGroupRes {
  count: number;
  next: string;
  previous: string;
  results: Group[];
}

export interface Group {
  id: number;
  professors: Professor[];
  name: string;
  grade: string;
}

export interface Professor {
  id: number;
  ci: string;
  address: string;
  last_name: string;
  first_name: string;
  sex: string;
  user: number;
}

export const studentGroups = async (
  query: string
): Promise<StudentGroupRes | undefined> => {
  try {
    const response = await apiAuth.get(`/student_group/?${query}`);
    const data: StudentGroupRes = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const studentGroupsAll = async (
  query: string
): Promise<StudentGroupRes | undefined> => {
  try {
    const response = await apiAuth.get(
      `student_group/?paginate=false&${query}`
    );
    const data: StudentGroupRes = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export interface AddStudentGroupData {
  name: string;
  grade: string;
  professors: number[];
}

export const addStudentGroup = async (
  value: AddStudentGroupData
): Promise<Group | undefined> => {
  try {
    const response = await apiAuth.post(`/student_group/`, value);
    const data: Group = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateStudentGroup = async (
  id: string,
  value: AddStudentGroupData
): Promise<Group | undefined> => {
  try {
    const response = await apiAuth.patch(`/student_group/${id}/`, value);
    const data: Group = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteStudentGroup = async (id: number) => {
  try {
    const response = await apiAuth.delete(`/student_group/${id}/`);

    const data = response.data;

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getStudentGroup = async (
  id: string
): Promise<Group | undefined> => {
  try {
    const response = await apiAuth.get(`/student_group/${id}/`);

    const data: Group = response.data;

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
