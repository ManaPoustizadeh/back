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

    async $id_address_post(request, reply, { id }) {
        let user =await User.findOne({
            _id: id
        }, (err, user) => {
            user.addresses = request.payload.addresses;
            user.save();
            reply(user)
        });
    }

    async $id_order_post(request, reply, { id }) {
        let order = new Order({
            foods: request.payload.order.foods, 
            price: request.payload.order.price, 
            address: request.payload.order.address,
            status: 'accepted'
        });
        let user =await User.findOne({
            _id: id
        }, (err, user) => {
            order.user = user;
            try {
                order.save();
                user.orders.push(order);
                user.save();
                reply({order, user})
            } catch (error) {
                reply('Error saving order')
            }
        });
    }
}

module.exports = AdminController;