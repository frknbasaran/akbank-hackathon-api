import {Account} from '../core';
import KoaRouter from 'koa-router';

const Router = new KoaRouter();

Router.get('/v1/accounts', Account.getAll);

export default Router;