export interface AuthVerify {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  groups: Group[];
  is_superuser: boolean;
}

export interface Group {
  id: number;
  name: string;
  permissions: number[];
}

export interface LoginRes {
  user: User;
  status: string;
  access: string;
  refresh: string;
}

export interface User {
  id: number;
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  roles: string[];
}

export interface GroupRes {
  count: number;
  next: null;
  previous: null;
  results: Rol[];
}

export interface Rol {
  id: number;
  name: string;
}
