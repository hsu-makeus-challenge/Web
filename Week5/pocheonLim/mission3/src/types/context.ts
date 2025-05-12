import { User } from './user';

export interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
} 