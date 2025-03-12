import { apiAuth } from "../api";

export interface SchoolStatistics {
  amount_of_students: number;
  amount_of_students_7: number;
  amount_of_students_8: number;
  amount_of_students_9: number;
  amount_of_professor: number;
}

export const getSchoolStatistics = async (): Promise<
  SchoolStatistics | undefined
> => {
  try {
    const response = await apiAuth.get(`school/statistics/`);
    const data: SchoolStatistics = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
