/**
 * Created by rajab on 5/28/2017.
 */


const  Controller = require('bak/lib/controller');
const {Category} = require('../../models');

class CategoryController extends Controller {
   

    /*
    ** Gives all categories populated with their foods
    */
    async _(request, reply) {
        const  categories  = Category.find({}).populate('foods')
        reply(categories)  
    }
}

module.exports = CategoryController;