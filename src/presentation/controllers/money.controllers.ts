import { MoneyServices } from '../../application/services/money.services';
import { Context } from 'hono';
import { createResponse } from '../../shared/responseHelper';
import { MoneyRepositories } from '../../infrastructure/repositories/money.repositories';
import { getCookie } from 'hono/cookie';
import { decode } from 'hono/jwt';

const moneyRepositories = new MoneyRepositories();
const moneyServices = new MoneyServices(moneyRepositories);

export class MoneyControllers {
  static async getAmount(c: Context) {
    return c.json(
      createResponse(
        200,
        {
          amount: await moneyServices.getAmount(),
        },
        'success'
      )
    );
  }

  static async postAmount(c: Context) {
    const { amount, spendType } = c.req.valid('json' as never);
    await moneyServices.postAmount(amount, spendType);
    return c.json(createResponse(201, {}, 'success'));
  }

  static async getAmountById(c: Context) {
    const { id } = c.req.param();
    return c.json(
      createResponse(
        200,
        {
          amount: await moneyServices.getAmountById(Number(id)),
        },
        'success'
      )
    );
  }

  static async updateAmount(c: Context) {
    const { id } = c.req.param();
    const { amount, spendType } = c.req.valid('json' as never);
    await moneyServices.updateAmount(Number(id), amount, spendType);
    return c.json(createResponse(200, {}, 'success'));
  }

  static async deleteAmountById(c: Context) {
    const { id } = c.req.param();
    const getAmount = await moneyServices.getAmountById(Number(id));

    if (!getAmount) {
      return c.json(createResponse(404, {}, 'data not found'));
    }

    await moneyServices.deleteAmountById(Number(id));
    return c.json(createResponse(204, {}, 'success'));
  }
}
