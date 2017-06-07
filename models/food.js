const {Schema} = require('mongoose');
const {Model} = require('bak');

class Food extends Model{

    static get $schema() {
        return {
            name: {type: String, required: true},
            price: {type: Number, required: true},
            slug: {type: String}, //for minio photo
            quantity: {type: Number}, //This field is for setting quantity of the available food in the restaurant,
            available: {type: Boolean, required: true},
            order: {type: Number} //This is for re-ordering and changing category order for the restaurant
        }
    }
}

module.exports = Food.$model;
