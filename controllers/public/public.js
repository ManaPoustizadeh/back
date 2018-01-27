

const Controller = require('bak/lib/controller');
const { Movie, Comment, User } = require('../../models');
const fs = require('fs');
const uuid =  require('uuid');

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

    async register_post(request, reply) {
        const username = request.payload.username;
        const email = request.payload.email;
        const password = request.payload.password;
        let user = new User({username: username, email: email, password: password});
        try {
            await user.save();
            reply(user);
        } catch (error) {
            reply(Boom.badData());
        }
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

    async user_update_post(request, reply) {
        let {id, username, lastname, nickName, phoneNumber, email} = request.payload;
        User.findById(id, function(error, user){
            if(error)
                return handleError(error);
            user.username = username;
            user.lastName = lastname;
            user.nickName = nickName;
            user.phoneNumber = phoneNumber;
            user.email = email;
            try {
                user.save();
                reply(user);
            } catch (error) {
                reply(error)
            }

        })
    }

    async uploadHandler_post(request, reply) {
        try {
            const data = request.payload;
            const file = data['avatar']; // accept a field call avatar

            // save the file
            // const fileDetails = await uploader(file, fileOptions);

            if (!file) throw new Error('no file');

            const orignalname = file.hapi.filename;
            const filename = uuid.v1();
            const path = `./${filename}`;
            const fileStream = fs.createWriteStream(path);

            return new Promise((resolve, reject) => {
                file.on('error', function (err) {
                    reject(err);
                });

                file.pipe(fileStream);

                file.on('end', function (err) {
                    const fileDetails = {
                        fieldname: file.hapi.name,
                        originalname: file.hapi.filename,
                        filename,
                        mimetype: file.hapi.headers['content-type'],
                        destination: `${options.dest}`,
                        path,
                        size: fs.statSync(path).size,
                    }

                    resolve(fileDetails);
                })
            })


        } catch (e) {

        }
    }


}

module.exports = PublicController;