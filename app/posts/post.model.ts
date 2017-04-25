import Parse from '../Parse';

export class PostModel extends Parse.Object {
    constructor(options?: any) {
        super('PostModel', options);
    }
}

Parse.Object.registerSubclass('PostModel', PostModel);
