import { Auth } from '@prisma/client';

export interface IAuth {
  login(
    email: string,
    password: string
  ): Promise<Pick<Auth, 'refresh_token' | 'access_token'>>;
  register(email: string, password: string): Promise<Auth>;
  logout(email: string): Promise<void>;
  refreshToken(
    email: string
  ): Promise<Pick<Auth, 'refresh_token' | 'access_token'>>;
}
