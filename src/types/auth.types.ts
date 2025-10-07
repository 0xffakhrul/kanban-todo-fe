export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface AuthResponse {
  user: User;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}
