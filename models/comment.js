const {Schema} = require('mongoose');
const {Model} = require('bak');

class Comment extends Model{

    static get $schema() {

        return {
            // created_at: {type: Schema.Types.Date},
            movie: {type: Schema.Types.ObjectId, ref:'Movie'},
            author: {type: String},
            rate: {type: Schema.Types.Number, min:0, max:5},
            comment: {type: String},
        }
    }
}

module.exports = Comment.$model;
