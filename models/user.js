const BaseUser = require('bak/lib/auth/provider/user');
const {Schema} = require('mongoose');
const {ACTIONS} = require('../lib/audit');

class User extends BaseUser {

    static get $visible() {
        return ['_id', 'name', 'username', 'email', 'avatar', 'roles'];
    }

    static get $schema() {
        return Object.assign({}, BaseUser.$schema, {
            roles: {type: Array},
            departments: [{type: Schema.Types.ObjectId, ref: 'Department'}]
        });
    }

    afterLogin({request, session}) {
        request.audit({
            action: ACTIONS.USER_LOGIN,
        });
    }

    afterLogout({request, session}) {
        request.audit({
            action: ACTIONS.USER_LOGOUT,
        });
    }

}

module.exports = User.$model;
