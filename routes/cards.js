import {Card} from '../core';
import KoaRouter from 'koa-router';

const Router = new KoaRouter();

Router.get('/v1/cards', Card.getAll);

export default Router;