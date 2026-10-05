export interface AuthUser {
  id: number;
  name: string;
  email: string;
  rol: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthSession {
  user: AuthUser;
  token: string;
  menu: MenuOption[];
  accesos: HomeAccess[];
}


export interface MenuOption {
  id: string;
  label: string;
  icon?: string;
  to?: string;
  children?: MenuOption[];
}

export interface HomeAccess {
  id: string;
  title: string;
  description: string;
  icon?: string;
  to: string;
}