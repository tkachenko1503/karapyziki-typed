import { Controller, Get, Post } from 'nest.js';
import { SiteInfoService } from '../site/siteInfo.service';
import { PostsService } from './posts.service';
import { PageData } from '../types';

@Controller()
export class PostsController {
    constructor(
        private siteInfoService: SiteInfoService,
        private postsService: PostsService
    ) {}

    @Get('/')
    async postsListPage(req, res) {
        const { page = 1 } = req.query;
        const siteInfo = await this.siteInfoService.getSiteInfo();
        const posts = await this.postsService.getPagedPosts(page);

        if (!posts.length) {
            return res.redirect('/404');
        }

        const pageData :PageData = {
            site: siteInfo,
            page: {
                posts,
                paginator: {
                    total_pages: 2,
                    previous_page: 0,
                    previous_page_path: '',
                    next_page: 1,
                    next_page_path: ''
                }
            }
        };

        res.render('post-list/post-list', pageData);
    }

    @Get('/post/:postId')
    async postDetailsPage(req, res) {
        const postId = req.params.postId;
        const siteInfo = await this.siteInfoService.getSiteInfo();
        let post;

        try {
            post = await this.postsService.getSinglePost(postId);
        } catch (error) {
            // @todo check error type
            return res.redirect('/404');
        }

        const pageData :PageData = {
            site: siteInfo,
            page: {
                post,
                nextPost: {}
            }
        };

        res.render('post-details/post-details', pageData);
    }

    @Post('post/new')
    async createNewPost(req, res) {
        const postData = req.body.post;
        const picture = req.buffer;
        const post = await this.postsService.createPost(postData, picture);

        res
            .status(201)
            .json({
                success: true,
                id: post.id
            });
    }
}
