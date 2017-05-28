/**
 * Created by rajab on 5/28/2017.
 */
const Controller = require('bak/lib/controller');

class PublicController extends Controller {

    constructor() {
        super({
            models: {},
            default: {}
        });
    }

    async _(request, reply) {
        reply('Hello World!');
    }
}

module.exports = PublicController;