import { apiAuth } from "../api";

export interface DropoutsRes {
  count: number;
  next: string;
  previous: string;
  results: Result[];
}

export interface Result {
  id: number;
  student: StudentDropouts;
  date: Date;
  municipality: string;
  province: string;
  school: string;
}

export interface StudentDropouts {
  id?: number;
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

export const dropouts = async (
  query: string
): Promise<DropoutsRes | undefined> => {
  try {
    const response = await apiAuth.get(`dropouts/?${query}`);
    const data: DropoutsRes = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export interface AddDropoutData {
  date: string;
  municipality: string;
  province: string;
  school: string;
  student: number;
}

export const addDropout = async (
  value: AddDropoutData
): Promise<Result | undefined> => {
  try {
    const response = await apiAuth.post(`dropouts/`, value);
    const data: Result = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateDropout = async (
  id: string,
  value: AddDropoutData
): Promise<Result | undefined> => {
  try {
    const response = await apiAuth.patch(`dropouts/${id}/`, value);
    const data: Result = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteDropout = async (id: number) => {
  try {
    await apiAuth.delete(`dropouts/${id}/`);
  } catch (error) {
    return Promise.reject(error);
  }
};

export interface DropoutsGetRes {
  id: number;
  student: Student;
  approved_school_course: ApprovedSchoolCourse;
  career: Career;
}

export interface ApprovedSchoolCourse {
  id: number;
  student: Student;
  school_year: SchoolYear;
  date: Date;
  grade: number;
}

export interface SchoolYear {
  id: number;
  start_date: Date;
  end_date: Date;
  name: string;
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

export interface Career {
  id: number;
  amount: number;
  name: string;
}

export const getDropout = async (
  id: string
): Promise<DropoutsGetRes | undefined> => {
  try {
    const response = await apiAuth.get(`dropouts/${id}/`);

    const data: DropoutsGetRes = response.data;

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
