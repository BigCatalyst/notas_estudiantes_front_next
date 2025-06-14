import { apiAuth } from "../api";

//careers
export interface CareersRes {
  count: number;
  next: string;
  previous: string;
  results: Career[];
}

export interface Career {
  id?: number;
  amount: number;
  name: string;
}

export const careers = async (
  query: string
): Promise<CareersRes | undefined> => {
  try {
    const response = await apiAuth.get(`careers/?${query}`);
    const data: CareersRes = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const careersAll = async (
  query: string
): Promise<Career[] | undefined> => {
  try {
    const response = await apiAuth.get(`careers/?paginate=false&${query}`);
    const data: Career[] = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addCareer = async (value: Career): Promise<Career | undefined> => {
  try {
    const response = await apiAuth.post(`careers/`, value);
    const data: Career = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateCareer = async (
  id: string,
  value: Career
): Promise<Career | undefined> => {
  try {
    const response = await apiAuth.patch(`careers/${id}/`, value);
    const data: Career = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteCareer = async (id: number) => {
  try {
    const response = await apiAuth.delete(`careers/${id}/`);

    const data = response.data;

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCareer = async (id: string): Promise<Career | undefined> => {
  try {
    const response = await apiAuth.get(`careers/${id}/`);

    const data: Career = response.data;

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCarrerasOtorgadas = async () => {
  try {
    const response = await apiAuth.get(`grant_career/current/`);
    const data = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
interface DegreeScale {
  id: number;
  ranking_score: number;
  ranking_number: number;
  student: number;
  school_year: number;
}

export interface GrandCarrerRes {
  id: number;
  student: Student;
  approved_school_course: ApprovedSchoolCourse;
  career: Career;
  degree_scale: DegreeScale;
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
  group: Group;
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

export interface Group {
  id: number;
  professors: Professor[];
  name: string;
  grade: number;
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

export const grant_careers = async (
  query: string
): Promise<GrandCarrerRes[] | undefined> => {
  try {
    const response = await apiAuth.get(
      `grant_career/?paginate=false&ordering=student__ci&${query}`
    );
    const data: GrandCarrerRes[] = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const make_granting = async (): Promise<
  GrandCarrerRes[] | undefined
> => {
  try {
    const response = await apiAuth.get(`grant_career/grant/`);
    const data: GrandCarrerRes[] = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

interface VerificarEstudintesSinOtorgamiento {
  without_granting: boolean;
}

export const verificarEstudintesSinOtorgamiento = async (): Promise<
  VerificarEstudintesSinOtorgamiento | undefined
> => {
  try {
    const response = await apiAuth.get(`grant_career/without_granting/`);

    const data: VerificarEstudintesSinOtorgamiento = response.data;

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
