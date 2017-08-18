/**
 * Created by rajab on 5/28/2017.
 */
const Controller = require('bak/lib/controller');
const Boom = require('boom');
const { User, Order } = require('../../models');
const _ = require('lodash');

class UserController extends Controller {

    constructor(opts) {
        super(_.defaultsDeep({
            default: {
                auth: {mode: 'required'},
            }
        }, opts));
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

    async $id_post(request, reply, { id }) {
        const username = request.payload.username;
        const email = request.payload.email;
        const avatar = request.payload.avatar;
        const password = request.payload.password;
        User.findOne({
            _id: id
        }, (err, user) => {
            user.username = username;
            user.email = email;
            user.avatar = avatar;
            if(password.length != 0)
                user.password = password;
            try {
                user.save();
                reply({ user })
            } catch (error) {
                Boom.badData('Error Saving User Info');
            }
        })
        
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

module.exports = UserController;

