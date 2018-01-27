

const Controller = require('bak/lib/controller');
const { Movie, Comment } = require('../../models');

class MovieController extends Controller {

    constructor() {
        super({
            models: {Movie},
            default: {}
        });
    }

    
    async _(request, reply) {
        let movies = Movie.find({});
        reply(movies);
    }

    async recent_$number(request, reply, {number}){
        var movie_num = Number(number) || 10;
        let recent_movies = await Movie.find({}).sort({'created_at':-1}).limit(movie_num);
        reply(recent_movies);
    }

    async $id_details(request, reply, { id }) {
        let movie = await Movie.findOne({_id: id}).populate('comments');
        let sum = 0;
        movie.comments.forEach(comment => {
            sum+=comment.rate;
        });
        let avg = sum/movie.comments.length;
        movie.avg = avg;
        reply(movie);
    }

    async $id_comments(request, reply, { id }){
        let comments = Comment.find({'movie': id}).sort({'created_at': -1});
        reply(comments);
    }

    async $id_comments_post(request, reply, { id }){
        let {
            author,
            comment,
            rate,
            directorScore,
            writingScore, 
            actingScore,
            avatar,
        } = request.payload;
        let newComment = new Comment({author, comment, rate, directorScore, writingScore, actingScore, avatar});
        await Movie.findById(id, function(error, movie){
            if(error)
            return handleError(error);
            newComment.movie = movie;
            console.log(newComment);
            try {
                movie.comments = movie.comments.concat([newComment]);
                movie.save();
                newComment.save();
                // reply(movie);
            } catch (error) {
                console.log(error);
            }

        })
    }
}

module.exports = MovieController;