import { Controller, RequestMethod, RequestMapping } from 'nest.js';

@Controller()
export class MainController {

    @RequestMapping({ path: '/' })
    indexPage(req, res, next) {
        res.render('main');
    }

}
