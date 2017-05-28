/**
 * Created by rajab on 5/28/2017.
 */


const  Controller = require('bak/lib/controller');

class TestController extends Controller {
    constructor() {
        super({
            models: {},
            default: {}
        })
    }

    async _(request, reply) {
        reply('This is from test!');
    }
}

module.exports = TestController;