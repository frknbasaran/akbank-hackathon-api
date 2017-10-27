import AccountSchema from '../models/account';

import DB from '../utils/connection';

import Akbank from '../utils/akbank';
import Response from '../utils/response';


const Account = DB.model('Account', AccountSchema);

export default {
    "getAll": async (ctx) => {
        try {

            Akbank.getAccounts();

            if (ctx.request.query.customer) {
                ctx.body = Response.ok(await Account.find({
                    "customer": ctx.request.query.customer
                }));
            } else ctx.body = Response.error("Missing query param: customer");
        } catch (err) {
            ctx.status = err.status || 500;
            ctx.body = Response.error(err);
        }
    }
}