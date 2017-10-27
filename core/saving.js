import SavingSchema from '../models/saving';

import DB from '../utils/connection';
import Response from '../utils/response';
import Game from '../utils/game';
const Saving = DB.model('Saving', SavingSchema);

export default {
    "create": async (ctx) => {
        try {
            const SavingCount = await Saving.count({"customer": ctx.request.body.customer});
            if (SavingCount > 0) {
                ctx.body = Response.error("This user already have a saving plan.");
            } else {
                Game.sendAction("PlanOlustur");
                const SavingPlan = new Saving();
                SavingPlan.customer = ctx.request.body.customer;
                SavingPlan.target_amount = ctx.request.body.target_amount;
                SavingPlan.target_name = ctx.request.body.target_name;
                SavingPlan.card = ctx.request.body.card;
                SavingPlan.target_account = ctx.request.body.target_account;
                SavingPlan.expiry = ctx.request.body.expiry;
                SavingPlan.saving_type = ctx.request.body.saving_type;
                SavingPlan.saving_preference_0_20 = ctx.request.body.saving_preference_0_20;
                SavingPlan.saving_preference_20_100 = ctx.request.body.saving_preference_20_100;
                SavingPlan.saving_preference_100_plus = ctx.request.body.saving_preference_100_plus;
                // TODO: Calculate This
                SavingPlan.target_end_date = Date.now();
                ctx.body = Response.ok(await SavingPlan.save());
            }
        } catch (err) {
            ctx.status = err.status || 500;
            ctx.body = Response.error(err);
        }
    },
    "getOne": async (ctx) => {
        try {
            const saving = await Saving.findOne({
                "customer": ctx.request.query.customer
            }).populate('target_account');
            if (saving) ctx.body = Response.ok(saving);
            else ctx.body = Response.ok("no_plan");
        } catch (err) {
            ctx.status = err.status || 500;
            ctx.body = Response.error(err);
        }
    }
}