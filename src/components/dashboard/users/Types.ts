export interface UsersDashboardResponse {
  count: number;
  next: null;
  previous: null;
  results: User[];
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  groups: Group[];
  is_superuser: boolean;
}

export interface Group {
  id: number;
  name: string;
}
