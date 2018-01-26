

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
        let comments = await Comment.find({}).populate({
            path: 'movies',
            match: {_id:id}
        }).sort({'created_at': -1});
        reply(comments);
    }

    async $id_comments_post(request, reply, { id }){
        let {
            author,
            comment,
            rate,
        } = request.payload;
        let newComment = new Comment({author, comment, rate});
        Movie.findById(id, function(error, movie){
            if(error)
                return handleError(error);
            newComment.movie = movie;
            try {
                newComment.save();
                movie.comments.push(newComment);
                movie.save();
                reply(movie);
            } catch (error) {
                reply(error)
            }

        })
    }
}

module.exports = MovieController;