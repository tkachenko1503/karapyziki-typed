import { Component } from 'nest.js';
import Parse from '../Parse';
import flickr from '../flickr';

@Component()
export class PicturesService {
    savePicture(picture): Parse.Promise<any> {
        const pictureRequest = new Parse.Promise();

        flickr.upload(picture, (error, pictureId) => {
            if (error) {
                pictureRequest.reject(error);
            }

            flickr.getInfo(pictureId, (error, pictureInfo) => {
                if (error) {
                    pictureRequest.reject(error);
                }

                pictureRequest.resolve(pictureInfo);
            });
        });

        return pictureRequest;
    }
}
