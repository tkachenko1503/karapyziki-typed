import { Controller, Get, Post, Put, Delete } from 'nest.js';
import * as moment from 'moment';
import { PostsService, postView, postViewCollection } from '../posts/posts.service';

@Controller({ path: 'admin' })
export class AdminController {
    constructor(
        private postsService: PostsService
    ) {}

    @Get('/')
    async rootAdminPage(req, res) {
        const { page = 1 } = req.query;
        const posts = await this.postsService.getPagedPosts(page, 50);

        res.render('admin-root/admin-root', { posts: postViewCollection(posts) });
    }

    @Get('/post')
    async createPostPage(req, res) {
        res.render('create-post/create-post');
    }

    @Post('/post')
    async createNewPost(req, res) {
        const postPublishDate = req.body.postPublishDate;
        const datePublished = postPublishDate ? moment.utc(postPublishDate) : moment.utc();

        const postData = {
            title: req.body.postTitle,
            content: req.body.postContent,
            datePublished: datePublished.toDate(),
            picture: req.files[0]
        };

        let post;

        try {
            post = await this.postsService.createPost(postData);
        } catch (error) {
            return res
                .status(500)
                .end({
                    message: `Cant create post! Reason - ${error.message}`
                });
        }

        res
            .status(201)
            .json({
                success: true,
                id: post.id
            });
    }

    @Get('/post/:postId')
    async editPostPage(req, res) {
        const postId = req.params.postId;

        let post;

        try {
            post = await this.postsService.getSinglePost(postId);
        } catch (error) {
            // @todo check error type
            return res.redirect('/404');
        }

        res.render('edit-post/edit-post', { post: postView(post) });
    }

    @Put('/post/:postId')
    async updatePost(req, res) {
        const postId = req.params.postId;
        const postPublishDate = req.body.postPublishDate;
        const datePublished = postPublishDate ? moment.utc(postPublishDate) : moment.utc();

        const postData = {
            title: req.body.postTitle,
            content: req.body.postContent,
            datePublished: datePublished.toDate(),
            picture: req.files[0]
        };

        let post;

        try {
            post = await this.postsService.updatePost(postId, postData);
        } catch (error) {
            // @todo check error type
            return res
                .status(500)
                .end({
                    message: `Cant update post! Reason - ${error.message}`
                });
        }

        res
            .status(200)
            .json({
                success: true,
                id: post.id
            });
    }

    @Delete('/post/:postId')
    async deletePost(req, res) {
        const postId = req.params.postId;

        try {
            await this.postsService.deletePost(postId);
        } catch (error) {
            return res
                .status(500)
                .end({
                    message: `Cant delete post! Reason - ${error.message}`
                });
        }

        res
            .status(200)
            .json({
                success: true,
                id: postId
            });
    }
}
