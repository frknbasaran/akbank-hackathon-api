import {Customer} from '../core';
import KoaRouter from 'koa-router';

const Router = new KoaRouter();

Router.post('/v1/customers/login', Customer.logIn);

export default Router;