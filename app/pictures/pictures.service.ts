import { Component } from 'nest.js';
import Parse from '../Parse';
import flickr from '../flickr';

@Component()
export class PicturesService {
    savePicture(picture): Parse.Promise<any> {
        const pictureRequest = new Parse.Promise();

        flickr.upload(picture.buffer, (error, pictureId) => {
            if (error) {
                pictureRequest.reject(error);
                return;
            }

            flickr.getInfo(pictureId, (error, pictureInfo) => {
                if (error) {
                    pictureRequest.reject(error);
                    return;
                }

                pictureRequest.resolve(pictureInfo);
            });
        });

        return pictureRequest;
    }
}
