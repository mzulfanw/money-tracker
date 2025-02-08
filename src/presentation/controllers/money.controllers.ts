import { MoneyServices } from '../../application/services/money.services';
import { Money } from '../../domain/money';
import { Context } from 'hono';
import { createResponse } from '../../shared/responseHelper';

const money = new Money(10000, 0);
const moneyServices = new MoneyServices(money);

export class MoneyControllers {
  static async getBalance(c: Context) {
    return c.json(createResponse(200, { balance: moneyServices.getBalance() }));
  }

  static addMoney(c: Context) {
    const { amount } = c.req.valid('json' as never);
    moneyServices.addMoney(amount);
    return c.json(createResponse(201, { balance: moneyServices.getBalance() }));
  }

  static spendMoney(c: Context) {
    const { amount, reason } = c.req.valid('json' as never);
    moneyServices.spendMoney(amount, reason);
    return c.json(createResponse(201, { balance: moneyServices.getBalance() }));
  }

  static listSpend(c: Context) {
    return c.json(
      createResponse(200, { listSpend: moneyServices.getListSpend() })
    );
  }
}
