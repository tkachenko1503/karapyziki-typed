import { resolve } from 'path';
import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import { NestFactory } from 'nest.js';
import { ParseServer } from 'parse-server';
import env from '../configs/env';
import { MainModule } from './main/main.module';

const instance = configureBaseServer();
const app = NestFactory.create(MainModule, instance);

app.listen(env.PORT, () =>
    console.log(`Application is listening on port ${env.PORT}`));


function configureBaseServer() {
    const instance = express();
    const parseServer = new ParseServer({
        databaseURI: env.MONGODB_URI,
        serverURL: env.SERVER_URL,
        appId: env.KEYS.APP,
        masterKey: env.KEYS.MASTER,
        javascriptKey: env.KEYS.JS
    });

    // static
    instance.use(express.static('client'));

    // logger
    instance.use(morgan('common'));

    // views engine
    instance.set('views', resolve('client/pages'));
    instance.set('view engine', 'pug');

    // body parser
    instance.use(bodyParser.json());

    // parse
    instance.use('/parse', parseServer);

    return instance;
}
