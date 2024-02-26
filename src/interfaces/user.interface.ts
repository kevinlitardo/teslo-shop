export interface User {
  id: string;
  name: string;
  email: string;
  email_verified?: Date | null;
  password: string;
  role: string;
  image?: string | null;
}
