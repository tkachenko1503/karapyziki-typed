import env from '../configs/env';
import * as Parse from 'parse/node';

Parse.initialize(env.KEYS.APP);
Parse.CoreManager.set('SERVER_URL', env.SERVER_URL);

export default Parse;
