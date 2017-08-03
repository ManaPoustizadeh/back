/**
 * Created by rajab on 5/28/2017.
 */
const Controller = require('bak/lib/controller');
const _ = require('lodash');

class AdminBaseController extends Controller {

    constructor(opts) {
        super(_.defaultsDeep({
            default: {
                auth: {mode: 'required'},
                // plugins: {
                //     guards: ['access_admin']
                // }
            }
        }, opts));
    }

}

module.exports = AdminBaseController;

