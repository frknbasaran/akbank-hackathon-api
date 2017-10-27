import Games from '../utils/game';
import KoaRouter from 'koa-router';

const Router = new KoaRouter();

Router.get('/v1/games/player-info', Games.getPlayerGameInfo);
Router.get('/v1/games/player-missions', Games.getMissions);
Router.get('/v1/games/player-badges', Games.getBadges);

export default Router;