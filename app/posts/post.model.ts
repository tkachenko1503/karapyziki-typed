import Parse from '../Parse';
import * as moment from 'moment';
import { PostView } from '../types';

export class PostModel extends Parse.Object {
    constructor(options?: any) {
        super('PostModel', options);
    }

    view(): PostView {
        const { title, content, datePublished, contentPreview, picture } = this.toJSON();
        const published = moment(datePublished.iso);

        return {
            id: this.id,
            title,
            content,
            contentPreview,
            picture,
            datePublished: datePublished.iso,
            prettyDate: published.format('D MMM YYYY'),
            inputDate: published.format('YYYY-MM-DD'),
            url: `post/${this.id}/`
        }
    }
}

Parse.Object.registerSubclass('PostModel', PostModel);
