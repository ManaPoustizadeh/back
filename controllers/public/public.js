/**
 * Created by rajab on 5/28/2017.
 */
const Controller = require('bak/lib/controller');
const { User } = require('../../models');
const Boom = require('boom');
class PublicController extends Controller {

    constructor() {
        super({
            models: {User},
            default: {}
        });
    }

    async _(request, reply) {
        reply('Hello World!');
    }

    async getHello(request, reply) {
        reply(' World!');
    }

    async register_post(request, reply) {
        const name = request.payload.name;
        const email = request.payload.email;
        const password = request.payload.password;
        let user = new User({username: name, email: email, password: password});
        try {
            await user.save();
            reply(user);
        } catch (error) {
            reply(Boom.badData());
        }
    }
}

module.exports = PublicController;