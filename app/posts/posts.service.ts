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

export const postView = (post): PostView => post.view();
export const postViewCollection = (posts): PostView[] => posts.map(postView);

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
            .find();
    }

    getSinglePost(postId: string) {
        const query = new Parse.Query(PostModel);

        return query
            .get(postId);
    }

    createPost(data: PostData): Parse.Promise<PostModel> {
        const post = new PostModel();
        const postRequest = new Parse.Promise();
        let task;

        if (data.picture) {
            task = this.picturesService.savePicture(data.picture);
        } else {
            task = Parse.Promise.as(null);
        }

        task
            .then(pictureInfo => post.save({
                contentPreview: cutPreviewText(data.content),
                content: data.content,
                datePublished: data.datePublished,
                title: data.title,
                picture: pictureInfo ? makePictureUrl(pictureInfo) : void 0
            }))
            .then(
                post => postRequest.resolve(post),
                error => postRequest.reject(error)
            );

        return postRequest;
    }

    updatePost(postId: string, data: PostData): Parse.Promise<PostModel> {
        const updateRequest = new Parse.Promise();
        const tasks = [this.getSinglePost(postId)];

        if (data.picture) {
            tasks.push(this.picturesService.savePicture(data.picture));
        }

        Parse.Promise.when(tasks)
            .then(([post, pictureInfo]) => {
                if (data.content) {
                    post.set('contentPreview', cutPreviewText(data.content));
                    post.set('content', data.content);
                }

                if (data.datePublished) {
                    post.set('datePublished', data.datePublished);
                }

                if (data.title) {
                    post.set('title', data.title);
                }

                if (pictureInfo) {
                    post.set('picture', makePictureUrl(pictureInfo));
                }

                return post.save();
            })
            .then(
                post => updateRequest.resolve(post),
                error => updateRequest.reject(error)
            );

        return updateRequest;
    }

    deletePost(postId: string) {
        const post = new PostModel();

        post.id = postId;

        return post.destroy();
    }
}
