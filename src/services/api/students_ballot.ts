import { apiAuth } from "../api";

export interface BallotRes {
  count: number;
  next: string;
  previous: string;
  results: Ballot[];
}

export interface Ballot {
  id?: number;
  is_approved: boolean;
  ballot: string[];
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

export interface BallotData {
  list_career_name: string[];
}

export const ballots = async (
  query: string
): Promise<BallotRes | undefined> => {
  try {
    const response = await apiAuth.get(`students/ballot/?${query}`);
    const data: BallotRes = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addBallot = async (
  value: BallotData,
  idStudent: string
): Promise<Ballot | undefined> => {
  try {
    const response = await apiAuth.post(`students/ballot/${idStudent}/`, value);
    const data: Ballot = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateBallot = async (
  id: number,
  value: Ballot
): Promise<Ballot | undefined> => {
  try {
    const response = await apiAuth.patch(`students/ballot/${id}/`, value);
    const data: Ballot = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteBallot = async (id: number) => {
  try {
    const response = await apiAuth.delete(`students/ballot/${id}/`);

    const data = response.data;

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getBallot = async (id: string): Promise<string[] | undefined> => {
  try {
    const response = await apiAuth.get(`students/ballot/${id}/`);

    console.log(response);

    const data: string[] = response.data;

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

interface StudentBallotBanBditRes {
  can_edit_bullet: boolean;
}

export const student_ballot_can_edit = async (): Promise<
  StudentBallotBanBditRes | undefined
> => {
  try {
    const response = await apiAuth.get(`students/can_edit/`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const student_ballot_can_edit_add = async (
  data: StudentBallotBanBditRes
): Promise<StudentBallotBanBditRes | undefined> => {
  try {
    const response = await apiAuth.post(`students/can_edit/`, data);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
