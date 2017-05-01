import { Controller, Get, Post, Put } from 'nest.js';
import { PostsService, postView } from '../posts/posts.service';
// import { SiteInfoService } from '../site/siteInfo.service';
// import { PageData } from '../types';

const postPublishToDate = (publish): number[] =>
    publish.split('-').map(str => Number(str));

@Controller({ path: 'admin' })
export class AdminController {
    constructor(
        private postsService: PostsService
    ) {}

    @Get('/')
    async rootAdminPage(req, res) {
        res.render('admin-root/admin-root');
    }

    @Get('/post/new')
    async createPostPage(req, res) {
        res.render('create-post/create-post');
    }

    @Post('/post/new')
    async createNewPost(req, res) {
        const postPublishDate = req.body.postPublishDate;
        const datePublished = postPublishDate ? postPublishToDate(postPublishDate) : [];

        const postData = {
            title: req.body.postTitle,
            content: req.body.postContent,
            datePublished: datePublished.length
                ? new Date(datePublished[0], datePublished[1], datePublished[2])
                : new Date(),
            picture: req.files[0]
        };
        const post = await this.postsService.createPost(postData);

        res
            .status(201)
            .json({
                success: true,
                id: post.id
            });
    }

    @Get('/post/:postId/update')
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

    @Put('/post/:postId/update')
    async updatePost(req, res) {
        const postId = req.params.postId;
        const postPublishDate = req.body.postPublishDate;
        const datePublished = postPublishDate ? postPublishToDate(postPublishDate) : [];

        const postData = {
            title: req.body.postTitle,
            content: req.body.postContent,
            datePublished: datePublished.length
                ? new Date(datePublished[0], datePublished[1] - 1, datePublished[2])
                : new Date(),
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
            .status(201)
            .json({
                success: true,
                id: post.id
            });
    }
}
