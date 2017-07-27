const AdminBaseController = require('./_base');
const Boom = require('boom');

class AdminController extends AdminBaseController {

    constructor(opts) {
        super({
            models: {},
        });
    }
}

module.exports = AdminController;