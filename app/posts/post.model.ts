import Parse from '../Parse';
import * as moment from 'moment';
import { PostView } from '../types';

export class PostModel extends Parse.Object {
    constructor(options?: any) {
        super('PostModel', options);
    }

    view(): PostView {
        const { title, content, datePublished, contentPreview, picture } = this.toJSON();

        return {
            title,
            content,
            contentPreview,
            picture,
            datePublished: datePublished.date,
            prettyDate: moment(datePublished.date).format('D MMM YYYY'),
            url: `post/${this.id}/`
        }
    }
}

Parse.Object.registerSubclass('PostModel', PostModel);
