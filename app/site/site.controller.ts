import { Controller, Get } from 'nest.js';
import { SiteInfoService } from './siteInfo.service';
import { PostsService } from '../posts/posts.service';
import { PageData } from '../types';

@Controller()
export class SiteController {
    constructor(
        private siteInfoService: SiteInfoService,
        private postsService: PostsService
    ) {}

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

        res.render('feed/feed', pageData, (error, xml) => {
            res.set('Content-Type', 'application/xml');
            res.send(xml);
        });
    }
}
