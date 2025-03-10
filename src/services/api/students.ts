import { apiAuth } from "../api";
import { Group } from "./group";

//students
export interface StudentsRes {
  count: number;
  next: string;
  previous: string;
  results: Student[];
}

export interface Student {
  id?: number;
  is_approved?: boolean;
  ci: string;
  address: string;
  grade: string;
  last_name: string;
  first_name: string;
  registration_number: string;
  sex: string;
  is_graduated?: boolean;
  is_dropped_out?: boolean;
  account?: Account;
  user?: string;
  group?: Group;
  can_edit_bullet?: boolean;
}

export interface StudentCreate {
  id?: number;
  is_approved?: boolean;
  ci: string;
  address: string;
  grade: string;
  last_name: string;
  first_name: string;
  registration_number: string;
  sex: string;
  is_graduated?: boolean;
  is_dropped_out?: boolean;
  account?: Account;
  user?: string;
  group?: string;
}

export interface Account {
  username?: string;
  password?: string;
  email?: string;
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

export const studentsAll = async (
  query: string
): Promise<Student[] | undefined> => {
  try {
    const response = await apiAuth.get(`students/?paginate=false&${query}`);
    const data: Student[] = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addStudent = async (
  value: StudentCreate
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
  id: string,
  value: StudentCreate
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

export const getStudent = async (id: string): Promise<Student | undefined> => {
  try {
    const response = await apiAuth.get(`students/${id}/`);

    const data: Student = response.data;

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

interface VerificarEstudintesSinEscalafonRes {
  are_students_whithout_ranking: string;
}

export const verificarEstudintesSinEscalafon = async (): Promise<
  VerificarEstudintesSinEscalafonRes | undefined
> => {
  try {
    const response = await apiAuth.get(`degree_scale/exist_whithout/`);

    const data: VerificarEstudintesSinEscalafonRes = response.data;

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

interface VerificarEstudintesSinBoleta {
  are_missing_ballots: boolean;
}

export const verificarEstudintesSinBoleta = async (): Promise<
  VerificarEstudintesSinBoleta | undefined
> => {
  try {
    const response = await apiAuth.get(`students/ballot/are_missing/`);

    const data: VerificarEstudintesSinBoleta = response.data;

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const subirGradoEstudiantes = async () => {
  try {
    const response = await apiAuth.get(`students/upgrading_all/`);

    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const escalafon = async () => {
  try {
    const res = await apiAuth.get(`degree_scale/current/`);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const escalafonCalcular = async () => {
  try {
    const res = await apiAuth.get(`degree_scale/calculated/`);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getStudentAccount = async (): Promise<Student | undefined> => {
  try {
    const response = await apiAuth.get(`students/me/`);

    const data: Student = response.data;

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
