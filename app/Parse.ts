import env from '../configs/env';
import * as Parse from 'parse/node';

Parse.initialize(env.KEYS.APP);
Parse.serverURL = env.SERVER_URL;

export default Parse;
