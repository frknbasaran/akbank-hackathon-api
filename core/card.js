import CardSchema from '../models/card';

import DB from '../utils/connection';

import Response from '../utils/response';
import Akbank from '../utils/akbank';

const Card = DB.model('Card', CardSchema);

export default {
    "getAll": async (ctx) => {
        try {
            Akbank.getCards();
            ctx.body = Response.ok(await Card.find({
                "customer": ctx.request.query.customer
            }));
        } catch (err) {
            ctx.status = err.status || 500;
            ctx.body = Response.error(err);
        }
    }
}