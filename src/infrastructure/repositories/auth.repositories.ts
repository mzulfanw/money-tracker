import { IAuth } from '../../application/interfaces/auth.interface';
import { Auth } from '@prisma/client';
import { prisma } from '../db/prisma';
import { sign } from 'hono/jwt';

export class AuthRepositories implements IAuth {
  async register(email: string, password: string): Promise<Auth> {
    return await prisma.auth.create({
      data: {
        email: email,
        password: await Bun.password.hash(password, {
          algorithm: 'bcrypt',
          cost: 4,
        }),
      },
    });
  }

  async login(
    email: string,
    password: string
  ): Promise<Pick<Auth, 'access_token' | 'refresh_token'>> {
    const user = await prisma.auth.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await Bun.password.verify(password, user.password);

    if (!isMatch) {
      throw new Error('Invalid password');
    }

    const access_token = await sign(
      {
        email: email,
        user_id: user.id,
        exp: Math.floor(Date.now() / 1000) + 60 * 5, // Expires in 5 minutes
      },
      'secret'
    );

    const refresh_token = await sign(
      {
        email: email,
        user_id: user.id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // Expires in 7 days
      },
      'secret'
    );

    await prisma.auth.update({
      where: { email },
      data: {
        access_token: access_token,
        refresh_token: refresh_token,
      },
    });

    return {
      access_token: access_token,
      refresh_token: refresh_token,
    };
  }

  async logout(email: string): Promise<void> {
    await prisma.auth.update({
      where: { email: email },
      data: {
        access_token: null,
        refresh_token: null,
      },
    });
  }

  async refreshToken(
    email: string
  ): Promise<Pick<Auth, 'refresh_token' | 'access_token'>> {
    const access_token = await sign(
      {
        email: email,
        exp: Math.floor(Date.now() / 1000) + 60 * 5, // Expires in 5 minutes
      },
      'secret'
    );

    const refresh_token = await sign(
      {
        email: email,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // Expires in 7 days
      },
      'secret'
    );
    await prisma.auth.update({
      where: { email: email },
      data: {
        access_token: access_token,
        refresh_token: refresh_token,
      },
    });

    return {
      access_token: access_token,
      refresh_token: refresh_token,
    };
  }
}
