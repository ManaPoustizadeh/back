const {Schema} = require('mongoose');
const {Model} = require('bak');

class Order extends Model{

    static get $schema() {
        return {
            user: {type: Schema.Types.ObjectId, ref: 'User'},
            foods: [{type: Schema.Types.ObjectId, ref: 'Food', quantity: Number}],
            slug: {type: String}, //for minio photo
            status: {type: String, enum: ['accepted', 'in_progress', 'ready', 'sent'], default: 'accepted'} //This is for re-ordering and changing category order for the restaurant
        }
    }
}

module.exports = Category.$model;
