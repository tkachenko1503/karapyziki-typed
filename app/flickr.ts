import env from '../configs/env';
import * as Flickr from 'flickr-upload';


const flickr = Flickr({
    consumer_key: env.FLICKR.CONSUMER.KEY,
    consumer_secret: env.FLICKR.CONSUMER.SECRET,
    token: env.FLICKR.TOKEN.KEY,
    token_secret: env.FLICKR.TOKEN.SECRET
});

export default flickr;
