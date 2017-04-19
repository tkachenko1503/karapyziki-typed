import { Component } from 'nest.js';

@Component()
export class PostsService {
    private posts = require('./posts.mock.json').posts;

    getPagedPosts() :Promise<object> {
        return Promise.resolve(this.posts);
    }

    getSinglePost(postId :string) :Promise<object> {
        return Promise.resolve(this.posts[0]);
    }
}
