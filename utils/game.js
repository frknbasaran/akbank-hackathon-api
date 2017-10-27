import Request from 'koa2-request';
import Response from './response';

export default {
    "getPlayerGameInfo": async (ctx) => {
        const result = await Request({
            url: "https://www.imona.com/platform/rest/publicService/ekip2/gamifyit/ReadPlayerGameProfile?id=furkanbsrn&gameId=Birikim",
            json: true,
            method: 'GET',
            headers: {
                'Authorization': 'Basic ZWtpcDI6ZWtpcDI='
            }
        });
        ctx.body = Response.ok({
            "currentLevel": result.body.currentLevel,
            "nextLevel": result.body.nextLevel,
            "totalPoint": result.body.totalPoint,
            "remainingPoint": result.body.remainingPoint,
            "progress": result.body.progress
        });
    },
    // TODO: Convert here to dynamic
    "sendAction": async (action) => {
        const result = await Request({
            uri: "https://www.imona.com/platform/rest/publicService/ekip2/gamifyit/CreateAction",
            json: true,
            method: 'POST',
            body: {
                "id": "furkanbsrn",
                "actionId": action, "parameters": [],
                "createdAt": Date.now(), "referenceId": Date.now().toString()
            },
            headers: {
                'Authorization': 'Basic ZWtpcDI6ZWtpcDI='
            }
        });
        console.log(result);
        return true;
    },
    "getMissions": async (ctx) => {
        const result = await Request({
            url: "https://www.imona.com/platform/rest/publicService/ekip2/gamifyit/ReadPlayerGameProfile?id=furkanbsrn&gameId=Birikim",
            json: true,
            method: 'GET',
            headers: {
                'Authorization': 'Basic ZWtpcDI6ZWtpcDI='
            }
        });
        ctx.body = Response.ok(result.body.missions);
    },
    "getBadges": async (ctx) => {
        const result = await Request({
            url: "https://www.imona.com/platform/rest/publicService/ekip2/gamifyit/ReadPlayerGameProfile?id=furkanbsrn&gameId=Birikim",
            json: true,
            method: 'GET',
            headers: {
                'Authorization': 'Basic ZWtpcDI6ZWtpcDI='
            }
        });
        ctx.body = Response.ok(result.body.collectibles);
    }
}
