import vars from './vars';

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || vars.mongoUri;
const SERVER_URL = process.env.SERVER_URL
                        ? `${process.env.SERVER_URL}parse`
                        : `http://localhost:${PORT}/parse`;

export default {
    PORT,
    MONGODB_URI,
    SERVER_URL,
    KEYS: {
        APP: vars.appKey,
        MASTER: vars.masterKey,
        JS: vars.javascriptKey
    }
};
