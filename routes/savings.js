import {Saving} from '../core';
import KoaRouter from 'koa-router';

const Router = new KoaRouter();

Router.get('/v1/savings', Saving.getOne);
Router.post('/v1/savings', Saving.create);

export default Router;