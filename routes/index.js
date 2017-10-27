import {Customer, Account, Card, Transaction, Saving} from '../core';
import Auth from '../utils/auth';
import KoaRouter from 'koa-router';

const Router = new KoaRouter();

Router.get('/', async (ctx) => {
  ctx.body = "Read api docs.";
});


export default Router;