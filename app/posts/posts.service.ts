import { Component } from 'nest.js';
import Parse from '../Parse';
import { siteInfo } from '../../configs/siteInfo';
import { PostModel } from './post.model';

@Component()
export class PostsService {
    getPagedPosts(page: number, limit = siteInfo.paginate): Parse.Promise<PostModel[]> {
        const skip = page > 1 ? page * limit : 0;
        const query = new Parse.Query(PostModel);

        return query
            .limit(limit)
            .skip(skip)
            .find();
    }

    getSinglePost(postId: string): Parse.Promise<PostModel> {
        const query = new Parse.Query(PostModel);

        return query.get(postId);
    }
}
