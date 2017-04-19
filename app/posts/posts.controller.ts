import { Controller, Get } from 'nest.js';
import { SiteInfoService } from '../site/siteInfo.service';
import { PostsService } from './posts.service';

interface PageData {
    site: object,
    page: object,
}

@Controller()
export class PostsController {
    constructor(
        private siteInfoService: SiteInfoService,
        private postsService: PostsService
    ) {}

    @Get('/')
    async postsListPage(req, res, next) {
        const siteInfo = await this.siteInfoService.getSiteInfo();
        const posts = await this.postsService.getPagedPosts();

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

    @Get('/archive')
    async archivePage(req, res, next) {
        const siteInfo = await this.siteInfoService.getSiteInfo();
        const posts = await this.postsService.getPagedPosts();

        const pageData :PageData = {
            site: siteInfo,
            page: {
                posts
            }
        };

        res.render('archive/archive', pageData);
    }

    @Get('/feed.xml')
    async feedPage(req, res, next) {
        const siteInfo = await this.siteInfoService.getSiteInfo();
        const posts = await this.postsService.getPagedPosts();

        const pageData :PageData = {
            site: siteInfo,
            page: {
                posts
            }
        };

        res.render('feed/feed', pageData);
    }

    @Get('/post/:postId')
    async postDetailsPage(req, res, next) {
        const postId = req.params.postId;
        const siteInfo = await this.siteInfoService.getSiteInfo();
        const post = await this.postsService.getSinglePost(postId);

        const pageData :PageData = {
            site: siteInfo,
            page: {
                post,
                nextPost: {}
            }
        };

        res.render('post-details/post-details', pageData);
    }
}
