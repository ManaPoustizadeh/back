const {Schema} = require('mongoose');
const {Model} = require('bak');

class Comment extends Model{

    static get $schema() {

        return {
            // created_at: {type: Schema.Types.Date},
            movie: {type: Schema.Types.ObjectId, ref:'Movie'},
            author: {type: String},
            rate: {type: Schema.Types.Number, min:0, max:5},
            directorScore: {type: Number},
            writingScore: {type: Number},
            actingScore: {type: Number},
            comment: {type: String},
            avatar: {type: String},
            upVoteCount: {type: Number, default: 0},
            downVoteCount: {type: Number, default: 0},
            recommend: {type: Boolean, default: true}
        }
    }
}

module.exports = Comment.$model;
