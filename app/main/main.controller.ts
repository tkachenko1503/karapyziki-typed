import { Controller, RequestMethod, RequestMapping } from 'nest.js';
import siteInfo from '../../configs/siteInfo';

interface PageData {
    site: object,
    page: object,
}

@Controller()
export class MainController {

    @RequestMapping({ path: '/' })
    indexPage(req, res, next) {
        const pageData : PageData = {
            site: siteInfo,
            page: {
                posts: require('./mock.json').posts
            }
        };

        res.render('post-list/post-list', pageData);
    }

}
