

const  Controller = require('bak/lib/controller');
const {Order, Food} = require('../../models');

class OrderController extends Controller{

    constructor() {
        super({
            models: {Food, Order},
            default: {}
        });
    }
    async _(request, reply) {
        let orders = Order.find({}).populate('foods');
        reply(orders);
    }

    async $id(request, reply, { id }) {
        const order = Order.findOne({
            _id: id
        });
        reply(order);
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

    async $id_patch(request, reply, { id }) {
        Order.findOne({
            _id: id
        }, (err, order) => {
            try {
                order.paid = true;
                order.save();
                reply({order})
            } catch (error) {
                Boom.badData('Error Saving Order Info');
            }
        });
    }

}

module.exports = OrderController;