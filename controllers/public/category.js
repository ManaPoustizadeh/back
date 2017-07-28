/**
 * Created by rajab on 5/28/2017.
 */


const  Controller = require('bak/lib/controller');
const {Category} = require('../../models');

class CategoryController extends Controller {
   
    constructor() {
        super({
            models: {Category},
            default: {}
        });
    }

    /*
    ** Gives all categories populated with their foods
    */
    async _(request, reply) {
        const  categories  = Category.find({}).populate('foods')
        reply(categories)  
    }

    async $id(request, reply, {id}) {
        const category = Category.findById(id).populate('foods')
        reply(category)
    }
}

module.exports = CategoryController;