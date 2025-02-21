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