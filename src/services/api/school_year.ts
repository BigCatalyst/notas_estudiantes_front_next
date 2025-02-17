import { apiAuth } from "../api";

export interface SchoolYearRes {
  count: number;
  next: string;
  previous: string;
  results: SchoolYear[];
}

export interface SchoolYear {
  id: number;
  start_date: string;
  end_date: string;
  name: string;
}

export const schoolYears = async (
  query: string
): Promise<SchoolYearRes | undefined> => {
  try {
    const response = await apiAuth.get(`school_year/?${query}`);
    const data: SchoolYearRes = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addSchoolYear = async (
  value: SchoolYear
): Promise<SchoolYear | undefined> => {
  try {
    const response = await apiAuth.post(`school_year/`, value);
    const data: SchoolYear = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateSchoolYear = async (
  id: number,
  value: SchoolYear
): Promise<SchoolYear | undefined> => {
  try {
    const response = await apiAuth.patch(`school_year/${id}/`, value);
    const data: SchoolYear = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteSchoolYear = async (id: number) => {
  try {
    const response = await apiAuth.delete(`school_year/${id}/`);

    const data = response.data;

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
