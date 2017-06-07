const {Schema} = require('mongoose');
const {Model} = require('bak');

class Category extends Model{

    static get $schema() {
        return {
            name: {type: String, required: true},
            foods: [{type: Schema.Types.ObjectId, ref: 'Food'}],
            slug: {type: String}, //for minio photo
            order: {type: Number} //This is for re-ordering and changing category order for the restaurant
        }
    }
}

module.exports = Category.$model;
