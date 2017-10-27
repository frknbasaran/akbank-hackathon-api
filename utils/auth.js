import TokenSchema from '../models/token';
import DB from './connection';
import Response from './response';
import Error from './error';

const Token = DB.model('Token', TokenSchema);

export default {
    
}