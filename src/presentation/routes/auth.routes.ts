import { Hono } from 'hono';
import { schemaAuth } from '../../application/schema/auth.interface';
import { zValidator } from '../middlewares/validate';
import { AuthControllers } from '../controllers/auth.controllers';

const authRoutes = new Hono();

authRoutes.post(
  '/login',
  zValidator('json', schemaAuth),
  AuthControllers.login
);

authRoutes.post(
  '/register',
  zValidator('json', schemaAuth),
  AuthControllers.register
);

authRoutes.delete('/logout', AuthControllers.logout);

authRoutes.post('/refresh-token', AuthControllers.refreshToken);

export default authRoutes;
