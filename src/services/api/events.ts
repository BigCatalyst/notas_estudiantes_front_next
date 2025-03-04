import { apiAuth } from "../api";

export interface EventRes {
  count: number;
  next: string;
  previous: string;
  results: EventType[];
}

export interface EventType {
  id?: number;
  date: string;
  title: string;
  description: string;
}

export const events = async (query: string): Promise<EventRes | undefined> => {
  try {
    const response = await apiAuth.get(`school_event/?${query}`);
    const data: EventRes = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const eventsAll = async (
  query: string
): Promise<EventType[] | undefined> => {
  try {
    const response = await apiAuth.get(`school_event/?paginate=false&${query}`);
    const data: EventType[] = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addEvent = async (
  value: EventType
): Promise<EventType | undefined> => {
  try {
    const response = await apiAuth.post(`school_event/`, value);
    const data: EventType = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateEvent = async (
  id: string,
  value: EventType
): Promise<EventType | undefined> => {
  try {
    const response = await apiAuth.patch(`school_event/${id}/`, value);
    const data: EventType = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteEvent = async (id: number) => {
  try {
    const response = await apiAuth.delete(`school_event/${id}/`);
    const data = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getEvent = async (id: string): Promise<EventType | undefined> => {
  try {
    const response = await apiAuth.get(`school_event/${id}/`);
    const data: EventType = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
