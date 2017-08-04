const AdminBaseController = require('./_base');
const Boom = require('boom');
const { User } = require('../../models');

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

    async $id_address_post(request, reply, { id }) {
        let user =await User.findOne({
            _id: id
        }, (err, user) => {
            user.addresses = request.payload.addresses;
            user.save();
            reply(user)
        });
    }
}

module.exports = AdminController;