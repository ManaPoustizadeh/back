const AdminBaseController = require('./_base');
const Boom = require('boom');
const { User, Order } = require('../../models');

class AdminController extends AdminBaseController {

   
    constructor(opts) {
        super({
            models: {},
        });
    }

    async $id(request, reply, { id }) {
        let user = User.findOne({
            _id: id
        }).populate({
            path: 'orders',
            populate: {
                path: 'foods',
                model: 'Food'
            }
        });
        reply(user);
    }
   
}

module.exports = AdminController;