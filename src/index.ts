import { Hono } from 'hono';
import { showRoutes } from 'hono/dev';
import moneyRoutes from './presentation/routes/money.routes';
import authRoutes from './presentation/routes/auth.routes';
import { errorHandler } from './presentation/middlewares/errorHandler';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';

const app = new Hono().basePath('/api');

app.use(logger());
app.use('/api/*', cors());

app.route('/money', moneyRoutes);
app.route('/auth', authRoutes);

app.onError(errorHandler);

showRoutes(app, {
  verbose: true,
  colorize: true,
});

export default app;
