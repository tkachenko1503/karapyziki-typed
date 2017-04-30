import { Component } from 'nest.js';
import Parse from '../Parse';
import { siteInfo } from '../../configs/siteInfo';
import { PostModel } from './post.model';
import { PostData } from '../types';
import { PicturesService } from '../pictures/pictures.service';

const cutPreview = text =>
    text
        .split(' ')
        .slice(0, 30)
        .join(' ');

const makePictureUrl = ({ farm, server, id, secret }) =>
        `https://c2.staticflickr.com/${farm}/${server}/${id}_${secret}.jpg`;

@Component()
export class PostsService {
    constructor(
        private picturesService: PicturesService
    ) {}

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

    createPost(data: PostData, picture): Parse.Promise<PostModel> {
        const post = new PostModel();
        const postRequest = new Parse.Promise();

        this.picturesService
            .savePicture(picture)
            .then(pictureInfo => post.save({
                contentPreview: cutPreview(data.content),
                content: data.content,
                datePublished: data.datePublished,
                title: data.title,
                picture: makePictureUrl(pictureInfo)
            }))
            .then(postRequest.resolve, postRequest.reject);

        return postRequest;
    }
}
