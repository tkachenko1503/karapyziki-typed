import { Component } from 'nest.js';
import { siteInfo } from '../../configs/siteInfo';

@Component()
export class SiteInfoService {
    private siteInfo = siteInfo;

    getSiteInfo() :Promise<object> {
        return Promise.resolve(this.siteInfo);
    }
}
