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
