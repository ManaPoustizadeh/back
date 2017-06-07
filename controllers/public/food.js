/**
 * Created by rajab on 5/28/2017.
 */


const  Controller = require('bak/lib/controller');
const {Food} = require('../../models');

class FoodController extends Controller {

    async _(request, reply) {
        let foods = Food.find({});
        reply(foods);
    }
}

module.exports = FoodController;