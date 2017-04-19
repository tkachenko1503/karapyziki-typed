import { Module } from 'nest.js';
import { PostsController } from '../posts/posts.controller';
import { PostsService } from '../posts/posts.service';
import { SiteInfoService } from '../site/siteInfo.service';

@Module({
    controllers: [ PostsController ],
    components: [ SiteInfoService, PostsService ]
})
export class MainModule {}
