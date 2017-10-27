import CustomerSchema from '../models/customer';
import TokenSchema from '../models/token';

import DB from '../utils/connection';
import Response from '../utils/response';
import ErrorCode from '../utils/error';

import md5 from 'md5';

import DotEnv from 'dotenv';

DotEnv.config();

const Customer = DB.model('Customer', CustomerSchema);
const Token = DB.model('Token', TokenSchema);

export default {
    "logIn": async (ctx) => {
        try {
            // check user credentials
            const matchedUser = await Customer.find({$and: [{"identity": ctx.request.body.identity}, {"password": md5(ctx.request.body.password)}]});

            // is there any user with matched conditions?
            if (matchedUser.length > 0) {

                // check token belong that user and populate token with user field
                const userToken = await Token.find({"customer": matchedUser[0]._id}).populate('user', 'name username profilePhoto');

                // is there any token with matched conditions?
                // if not
                if (userToken.length < 1) {
                    // create new token for that user and return
                    const token = new Token();
                    token.token = md5(Date.now());
                    token.user = matchedUser[0]._id;
                    token.ip = ctx.ip;
                    ctx.body = Response.ok({"token": await token.save(), "user": matchedUser[0]});
                }
                // if exist any token
                else {
                    // remove exist token
                    await Token.remove({"user": matchedUser[0]._id});
                    // create new token for that user and return
                    const token = new Token();
                    token.token = md5(Date.now());
                    token.user = matchedUser[0]._id;
                    token.ip = ctx.ip;
                    ctx.body = Response.ok({"token": await token.save(), "user": matchedUser[0]});
                }
            }
            else throw Error(ErrorCode.User.INVALID_CREDENTIALS);
        } catch (err) {
            ctx.status = err.status || 200;
            ctx.body = Response.error(err);
        }
    }
}