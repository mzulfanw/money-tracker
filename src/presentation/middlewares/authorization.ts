import { createMiddleware } from 'hono/factory';
import { getCookie } from 'hono/cookie';
import { verify } from 'hono/jwt';

export const authorization = createMiddleware(async (c, next) => {
  console.log(`[${new Date().toISOString()}] ${c.req.method} ${c.req.url}`);
  const authToken = getCookie(c, '__auth_token');

  if (!authToken) {
    throw new Error('Unauthorized: No token provided !');
  }

  try {
    const decoded = await verify(authToken, 'secret');

    if (!decoded) {
      throw new Error('Token invalid');
    }

    c.header('Authorization', `Bearer ${authToken}`);

    await next();
  } catch (err) {
    throw new Error('Unauthorized: Invalid token or expired token');
  }
});
