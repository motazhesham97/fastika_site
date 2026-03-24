export interface Admin {
  id: string;
  email: string;
  name: string | null;
  created_at: string;
  last_login: string | null;
}

export interface AdminLoginCredentials {
  email: string;
  password: string;
}

export interface AdminSession {
  admin: Admin;
  token: string;
  expiresAt: number;
}

export interface AdminJWTPayload {
  adminId: string;
  email: string;
  iat: number;
  exp: number;
}
