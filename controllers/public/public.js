

const Controller = require('bak/lib/controller');
const { Movie, Comment } = require('../../models');

class PublicController extends Controller {

    constructor() {
        super({
            models: {Movie},
            default: {}
        });
    }

    async homepage(request, reply) {
        let searchBackground = "http://iranfilm.info/wp-content/uploads/2017/12/startwars.jpg";
        let staticBanner = "http://iranfilm.info/wp-content/uploads/2018/01/image_preview5454.png";
        let staticBannerTitle =  "بروسلی رو بگیر";
        let staticBannerSubTitle =  "بیا بگیرش دیگه";
        let staticBannerBackColor =  "#DAA521";
        let staticBannerTextColor = "black";
        let answer = {
            searchBackground,
            staticBanner, 
            staticBannerTitle, 
            staticBannerSubTitle,
            staticBannerBackColor,
            staticBannerTextColor,
        };
        reply(answer);
    }

    async search(request, reply){
        let movie = await Movie.find({$or: [{title: new RegExp(request.url.query.q, 'i')} , {description: new RegExp(request.url.query.q, 'i')}]});
        reply(movie);
    }

    async submit_post(request, reply) {
        let movie = new Movie(request.payload.movie);
        // console.log(movie);
        try {
            movie.save();
            reply(movie);
        } catch (error) {
            console.log(error);
        }
    }


}

module.exports = PublicController;