import { resolve } from 'path';
import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as multer from 'multer';
import { NestFactory } from 'nest.js';
import { ParseServer } from 'parse-server';
import env from '../configs/env';
import { MainModule } from './main/main.module';

const instance = configureBaseServer();
const app = NestFactory.create(MainModule, instance);

app.listen(env.PORT, () =>
    console.log(`Application is listening on port ${env.PORT}`));


function configureBaseServer() {
    const upload = multer({
        storage: multer.memoryStorage()
    });
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

    // file uploads
    server.use(upload.single('picture'));

    // parse
    server.use('/parse', parseServer);

    return server;
}
