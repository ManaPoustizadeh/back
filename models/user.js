const BaseUser = require('bak/lib/auth/provider/user');
const {Schema} = require('mongoose');
const {ACTIONS} = require('../lib/audit');

class User extends BaseUser {

    static get $visible() {
        return ['_id', 'username', 'email', 'avatar', 'roles', 'comments', 'phoneNumber', 'lastName', 'nickName'];
    }

    static get $schema() {

        return Object.assign({}, BaseUser.$schema, {
            username: {type: String},
            email: {type: String},
            comments: [{type: Schema.Types.ObjectId, ref:'Comment'}],
            roles: {type: Array},
            avatar: {type: String},
            phoneNumber: {type: String},
            lastName: {type: String},
            nickName: {type: String}
        });
    }

    afterLogin({request, session}) {
        request.audit({
            action: ACTIONS.USER_LOGIN,
        });
    }

    afterLogout({request, session}) {
        // request.audit({
        //     action: ACTIONS.USER_LOGOUT,
        // });
    }

}

module.exports = User.$model;
