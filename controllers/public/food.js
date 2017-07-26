/**
 * Created by rajab on 5/28/2017.
 */


const Controller = require('bak/lib/controller');
const { Food, User } = require('../../models');

class FoodController extends Controller {

    async _(request, reply) {
        let foods = Food.find({});
        reply(foods);
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

module.exports = FoodController;