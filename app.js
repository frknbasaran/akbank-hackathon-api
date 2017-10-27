import Koa from 'koa';
import Router from 'koa-router';
import BodyParser from 'koa-bodyparser';
import DotEnv from 'dotenv';
import KoaQs from 'koa-qs';
import Cors from 'kcors';

import CustomerAPI from './routes/customers';
import AccountAPI from './routes/accounts';
import CardAPI from './routes/cards';
import TransactionAPI from './routes/transactions';
import SavingAPI from './routes/savings';
import GameAPI from './routes/games';

const app = new Koa();
const router = new Router();

KoaQs(app);
DotEnv.config();

app
  .use(Cors())
  .use(BodyParser())
  .use(CustomerAPI.routes())
  .use(AccountAPI.routes())
  .use(CardAPI.routes())
  .use(TransactionAPI.routes())
  .use(SavingAPI.routes())
  .use(GameAPI.routes())
  .use(router.allowedMethods())
  .use(async(ctx) => {
    console.log(ctx.ip);
    ctx.status = 404;
    ctx.body = {
      "success": false,
      "message": "Invalid api route, please read api docs."
    };
  })
  .listen(process.env.PORT);