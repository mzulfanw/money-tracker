import { IAuth } from '../interfaces/auth.interface';
import { Auth } from '@prisma/client';

export class AuthServices {
  private _auth: IAuth;

  constructor(auth: IAuth) {
    this._auth = auth;
  }

  async login(
    email: string,
    password: string
  ): Promise<Pick<Auth, 'access_token' | 'refresh_token'>> {
    return this._auth.login(email, password);
  }

  async register(email: string, password: string): Promise<void> {
    await this._auth.register(email, password);
  }

  async logout(email: string): Promise<void> {
    await this._auth.logout(email);
  }

  async refreshToken(
    email: string
  ): Promise<Pick<Auth, 'refresh_token' | 'access_token'>> {
    return await this._auth.refreshToken(email);
  }
}
