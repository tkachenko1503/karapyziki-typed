import { Module } from 'nest.js';
import { PostsController } from '../posts/posts.controller';
import { SiteController } from '../site/site.controller';
import { PostsService } from '../posts/posts.service';
import { SiteInfoService } from '../site/siteInfo.service';
import { PicturesService } from '../pictures/pictures.service';

@Module({
    controllers: [ PostsController, SiteController ],
    components: [ SiteInfoService, PostsService, PicturesService ]
})
export class MainModule {}
