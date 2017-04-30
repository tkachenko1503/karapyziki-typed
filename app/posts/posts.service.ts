import { Component } from 'nest.js';
import Parse from '../Parse';
import { siteInfo } from '../../configs/siteInfo';
import { PostModel } from './post.model';
import { PostData, PostView } from '../types';
import { PicturesService } from '../pictures/pictures.service';

const cutPreviewText = text =>
    text
        .split(' ')
        .slice(0, 30)
        .join(' ');

const makePictureUrl = ({ farm, server, id, secret }) =>
        `https://c2.staticflickr.com/${farm}/${server}/${id}_${secret}.jpg`;

const postView = (post): PostView => post.view();
const postViewCollection = (posts): PostView[] => posts.map(postView);

@Component()
export class PostsService {
    constructor(
        private picturesService: PicturesService
    ) {}

    getPagedPosts(page: number, limit = siteInfo.paginate) {
        const skip = page > 1 ? page * limit : 0;
        const query = new Parse.Query(PostModel);

        return query
            .limit(limit)
            .skip(skip)
            .find()
            .then(postViewCollection);
    }

    getSinglePost(postId: string) {
        const query = new Parse.Query(PostModel);

        return query
            .get(postId)
            .then(postView);
    }

    createPost(data: PostData, picture: object): Parse.Promise<PostModel> {
        const post = new PostModel();
        const postRequest = new Parse.Promise();

        this.picturesService
            .savePicture(picture)
            .then(pictureInfo => post.save({
                contentPreview: cutPreviewText(data.content),
                content: data.content,
                datePublished: data.datePublished,
                title: data.title,
                picture: makePictureUrl(pictureInfo)
            }))
            .then(
                post => postRequest.resolve(post),
                error => postRequest.reject(error)
            );

        return postRequest;
    }
}
