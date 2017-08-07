

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
        const filter = request.payload.filter;
        const orders = Order.find({status: {$in: filter}}).populate('foods');
        reply(orders);
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