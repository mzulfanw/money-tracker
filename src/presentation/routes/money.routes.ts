import { Hono } from 'hono';
import { MoneyControllers } from '../controllers/money.controllers';
import { schemaAmount } from '../../application/schema/money.schema';
import { zValidator } from '../middlewares/validate';
import { authorization } from '../middlewares/authorization';

const moneyRoutes = new Hono();

moneyRoutes.use(authorization);

moneyRoutes.get('/amount', MoneyControllers.getAmount);
moneyRoutes.post(
  '/post-amount',
  zValidator('json', schemaAmount),
  MoneyControllers.postAmount
);
moneyRoutes.get('/amount/:id', MoneyControllers.getAmountById);
moneyRoutes.put(
  '/amount/:id',
  zValidator('json', schemaAmount),
  MoneyControllers.updateAmount
);
moneyRoutes.delete('/amount/:id', MoneyControllers.deleteAmountById);

export default moneyRoutes;
