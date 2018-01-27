const {Schema} = require('mongoose');
const {Model} = require('bak');

class Movie extends Model{

    static get $schema() {
        return {
            // created_at: {type: Schema.Types.Date},
            title: {type: String},
            description: {type: String},
            original_title: {type: String}, //total price for an order set
            rate: {type: Schema.Types.Number, min:0, max:5},
            year: {type: Schema.Types.Number},
            length: {type: String},
            lang: {type: String},
            thumbnail: {type: String},
            genres: [{type: String}],
            country: {type: String},
            director: {type: String},
            totalVotes: {type: Number},
            positiveVotes : {type: Number},
            qualities: {type: Array},
            resolutions: {type: Array},
            comments: [{type: Schema.Types.ObjectId, ref:'Comment'}],
            avg: {type: Number},
            imdbId: {type: String},
        }
    }
}


module.exports = Movie.$model;
