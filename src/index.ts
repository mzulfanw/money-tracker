import { Hono } from 'hono';
import { showRoutes } from 'hono/dev';
import moneyRoutes from './presentation/routes/money.routes';
import { errorHandler } from './presentation/middlewares/errorHandler';

const app = new Hono().basePath('/api');

app.route('/money', moneyRoutes);

app.onError(errorHandler);

showRoutes(app, {
  verbose: true,
  colorize: true,
});

export default app;
