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
    const server = express();
    const parseServer = new ParseServer({
        databaseURI: env.MONGODB_URI,
        serverURL: env.SERVER_URL,
        appId: env.KEYS.APP,
        masterKey: env.KEYS.MASTER,
        javascriptKey: env.KEYS.JS
    });

    // static
    server.use(express.static('client'));

    // logger
    server.use(morgan('common'));

    // views engine
    server.set('views', resolve('client/pages'));
    server.set('view engine', 'pug');

    // body parser
    server.use(bodyParser.json());

    // parse
    server.use('/parse', parseServer);

    return server;
}
