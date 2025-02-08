import { Hono } from 'hono';
import { MoneyControllers } from '../controllers/money.controllers';
import {
  addMoneySchema,
  addSpendSchema,
} from '../../application/schema/money.schema';
import { zValidator } from '../middlewares/validate';

const moneyRoutes = new Hono();

moneyRoutes.get('/balance', MoneyControllers.getBalance);
moneyRoutes.get('/list-spend', MoneyControllers.listSpend);
moneyRoutes.post(
  '/add-balance',
  zValidator('json', addMoneySchema),
  MoneyControllers.addMoney
);
moneyRoutes.post(
  '/add-spend',
  zValidator('json', addSpendSchema),
  MoneyControllers.spendMoney
);

export default moneyRoutes;
