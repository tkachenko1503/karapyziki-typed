const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const SERVER_URL = process.env.SERVER_URL
                        ? `${process.env.SERVER_URL}parse`
                        : `http://localhost:${PORT}/parse`;

export default {
    PORT,
    MONGODB_URI,
    SERVER_URL,
    KEYS: {
        APP: process.env.APP_KEY,
        MASTER: process.env.MASTER_KEY,
        JS: process.env.JS_KEY
    }
};
