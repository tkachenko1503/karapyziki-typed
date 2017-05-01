import { Module } from 'nest.js';
import { PostsController } from '../posts/posts.controller';
import { SiteController } from '../site/site.controller';
import { PostsService } from '../posts/posts.service';
import { SiteInfoService } from '../site/siteInfo.service';
import { PicturesService } from '../pictures/pictures.service';
import { AdminController } from '../admin/admin.controller';

@Module({
    controllers: [ PostsController, SiteController, AdminController ],
    components: [ SiteInfoService, PostsService, PicturesService ]
})
export class MainModule {}
