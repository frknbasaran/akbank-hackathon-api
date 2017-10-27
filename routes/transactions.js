import {Transaction} from '../core';
import KoaRouter from 'koa-router';

const Router = new KoaRouter();

Router.get('/v1/transactions', Transaction.getAll);
Router.post('/v1/transactions', Transaction.create);

export default Router;