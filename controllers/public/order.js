

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

}

module.exports = OrderController;