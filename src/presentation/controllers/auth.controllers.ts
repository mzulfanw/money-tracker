import { AuthServices } from '../../application/services/auth.interface';
import { Context } from 'hono';
import { createResponse } from '../../shared/responseHelper';
import { AuthRepositories } from '../../infrastructure/repositories/auth.repositories';
import { setCookie, getCookie } from 'hono/cookie';
import { decode } from 'hono/jwt';

const authRepositories = new AuthRepositories();
const authServices = new AuthServices(authRepositories);

export class AuthControllers {
  static async register(c: Context) {
    const { email, password } = c.req.valid('json' as never);
    await authServices.register(email, password);
    return c.json(createResponse(201, {}, 'success'));
  }

  static async login(c: Context) {
    const { email, password } = c.req.valid('json' as never);
    const { refresh_token, access_token } = await authServices.login(
      email,
      password
    );
    setCookie(c, '__auth_token', access_token as string, {
      httpOnly: true,
      maxAge: 60 * 5,
    });

    setCookie(c, '__refresh_token', refresh_token as string, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    return c.json(
      createResponse(200, { access_token, email, refresh_token }, 'success')
    );
  }

  static async logout(c: Context) {
    const cookie = getCookie(c, '__auth_token');
    const decode1 = decode(cookie as string);
    await authServices.logout(decode1.payload.email as string);
    setCookie(c, '__auth_token', '', {
      httpOnly: true,
      maxAge: 0,
    });
    setCookie(c, '__refresh_token', '', {
      httpOnly: true,
      maxAge: 0,
    });
    return c.json(createResponse(200, {}, 'success'));
  }

  static async refreshToken(c: Context) {
    const cookie = getCookie(c, '__refresh_token');
    const decode1 = decode(cookie as string);
    const { refresh_token, access_token } = await authServices.refreshToken(
      decode1.payload.email as string
    );
    setCookie(c, '__auth_token', access_token as string, {
      httpOnly: true,
      maxAge: 60 * 5,
    });

    setCookie(c, '__refresh_token', refresh_token as string, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    return c.json(
      createResponse(200, { access_token, refresh_token }, 'success')
    );
  }
}
