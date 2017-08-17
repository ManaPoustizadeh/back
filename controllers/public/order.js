

const  Controller = require('bak/lib/controller');
const {Order, Food} = require('../../models');

class OrderController extends Controller{

    constructor() {
        super({
            models: {Order, Food},
            default: {}
        });
    }

    async _(request, reply) {
        let orders = Order.find({}).populate('foods');
        reply(orders);
    }
	
    async _post(request, reply) {
        const filter = request.payload.obj.filter;
        const perPage = request.payload.obj.perPage;
        const curPage = request.payload.obj.curPage;
        let cur = curPage == 0 ? 0 : curPage-1;
        let orders = '';
        let filterOrder = await Order.find({status: {$in: filter}});
        orders = await Order.find({status: {$in: filter}}).populate('foods').skip(perPage * cur).limit(perPage);
        if(filter.length==0){
            filterOrder = await Order.find({});
            orders = await Order.find({}).populate('foods').skip(perPage * cur).limit(perPage);
        }
        reply({orders, count:filterOrder.length});
    }
	
	 async $id_post(request, reply, {id}){
        const state = request.payload.state;
        Order.findById(id, function (err, order) {
            if (err) return handleError(err);

            order.status = state;
            order.save(function (err, updatedOrder) {
                if (err) return handleError(err);
                reply(updatedOrder)
            });
        });
    }

}

module.exports = OrderController;