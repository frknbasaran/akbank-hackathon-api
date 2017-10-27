import TransactionSchema from '../models/transaction';
import SavingSchema from '../models/saving';
import AccountSchema from '../models/account';

import DB from '../utils/connection';

import Response from '../utils/response';
import Akbank from '../utils/akbank';
import Game from '../utils/game';

const Transaction = DB.model('Transaction', TransactionSchema);
const Saving = DB.model('Saving', SavingSchema);
const Account = DB.model('Account', AccountSchema);

export default {
    "create": async (ctx) => {
        try {

            const amount = ctx.request.body.amount;

            Akbank.createTransaction(amount);
            Game.sendAction("Alisveris");

            const Plan = await Saving.findOne({
                "customer": ctx.request.body.customer
            });

            const target_account = await Account.findOne({
                "_id": Plan.target_account
            });

            if (amount <= 20 && Plan.saving_preference_0_20) {
                let lastPriceCalculated = Math.ceil(amount);
                let roundedAmount = lastPriceCalculated - amount;

                Akbank.createTransaction(roundedAmount);

                const newTransaction = new Transaction();

                newTransaction.customer = ctx.request.body.customer;
                newTransaction.rounded_amount = roundedAmount;
                newTransaction.pure_amount = amount;
                newTransaction.final_amount = lastPriceCalculated;
                newTransaction.description = ctx.request.body.description;
                newTransaction.card = ctx.request.body.card;

                target_account.balance = target_account.balance + roundedAmount;
                await target_account.save();

                ctx.body = await newTransaction.save();

            } else if ((amount >= 20 && amount < 100) && Plan.saving_preference_20_100) {

                let decimal = Math.floor(amount / 10);
                if (amount < ((decimal * 10) + 5)) {
                    let lastPriceCalculated = ((decimal * 10) + 5);
                    let roundedAmount = lastPriceCalculated - amount;


                    Akbank.createTransaction(roundedAmount);

                    const newTransaction = new Transaction();

                    newTransaction.customer = ctx.request.body.customer;
                    newTransaction.rounded_amount = roundedAmount;
                    newTransaction.pure_amount = amount;
                    newTransaction.final_amount = lastPriceCalculated;
                    newTransaction.description = ctx.request.body.description;
                    newTransaction.card = ctx.request.body.card;

                    target_account.balance = target_account.balance + roundedAmount;
                    await target_account.save();

                    ctx.body = await newTransaction.save();
                } else {
                    let lastPriceCalculated = ((decimal * 10) + 10);
                    let roundedAmount = lastPriceCalculated - amount;

                    const newTransaction = new Transaction();

                    Akbank.createTransaction(roundedAmount);

                    newTransaction.customer = ctx.request.body.customer;
                    newTransaction.rounded_amount = roundedAmount;
                    newTransaction.pure_amount = amount;
                    newTransaction.final_amount = lastPriceCalculated;
                    newTransaction.description = ctx.request.body.description;
                    newTransaction.card = ctx.request.body.card;

                    target_account.balance = target_account.balance + roundedAmount;
                    await target_account.save();

                    ctx.body = await newTransaction.save();
                }
            } else if (amount >= 100 && Plan.saving_preference_100_plus) {
                let divided = Math.floor(amount / 10);
                let lastPriceCalculated = (divided * 10) + 10;
                let roundedAmount = lastPriceCalculated - amount;

                const newTransaction = new Transaction();

                Akbank.createTransaction(roundedAmount);

                newTransaction.customer = ctx.request.body.customer;
                newTransaction.rounded_amount = roundedAmount;
                newTransaction.pure_amount = amount;
                newTransaction.final_amount = lastPriceCalculated;
                newTransaction.description = ctx.request.body.description;
                newTransaction.card = ctx.request.body.card;

                target_account.balance = target_account.balance + roundedAmount;
                await target_account.save();

                ctx.body = await newTransaction.save();

            } else {
                ctx.body = Response.ok();
            }
        } catch (err) {
            ctx.status = err.status || 500;
            ctx.body = Response.error(err);
        }
    },
    "getAll": async (ctx) => {
        try {
            Akbank.getTransactions();
            const transactions = await Transaction.find({
                "customer": ctx.request.query.customer
            }).sort('-date');
            ctx.body = Response.ok(transactions);

        } catch (err) {
            ctx.status = err.status || 500;
            ctx.body = Response.error(err);
        }
    }
}