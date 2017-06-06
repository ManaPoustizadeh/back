/**
 * Created by rajab on 5/28/2017.
 */


const  Controller = require('bak/lib/controller');
const {User} = require('../../models');

class TestController extends Controller {
    constructor() {
        super({
            models: {},
            default: {}
        })
    }

    async _(request, reply) {
        reply('Helllo world!');
    }
}

module.exports = TestController;