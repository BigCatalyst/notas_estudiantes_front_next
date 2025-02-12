export interface UsersDashboardResponse {
  count: number;
  next: null;
  previous: null;
  results: User[];
}

export interface User {
  id?: number | null;
  username?: string;
  email: string;
  first_name: string;
  last_name: string;
  password?: string;
  is_active?: boolean;
  groups?: Group[] | string[];
  is_superuser?: boolean;
}

export interface Group {
  id?: number;
  name: string;
}
