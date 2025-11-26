export interface RegisterCredentials {
  email: string;
  password: string;
  username: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthContextType {
  children: React.ReactNode;
  user: any;
}
