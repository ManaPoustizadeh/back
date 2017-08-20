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

    async order_post(request, reply) {
        const filter = request.payload.obj.filter;
        const perPage = request.payload.obj.perPage;
        const curPage = request.payload.obj.curPage;
        let cur = curPage == 0 ? 0 : curPage-1;
        let filterOrder = await Order.find({status: {$in: filter}, paid: true});
        let orders = await Order.find({status: {$in: filter}, paid: true}).populate('foods').skip(perPage * cur).limit(perPage);
        if(filter.length==0){
            filterOrder = await Order.find({paid: true});
            orders = await Order.find({paid: true}).populate('foods').skip(perPage * cur).limit(perPage);
        }
        reply({orders, count:filterOrder.length});
    }
   
}

module.exports = AdminController;