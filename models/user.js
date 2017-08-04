const BaseUser = require('bak/lib/auth/provider/user');
const {Schema} = require('mongoose');
const {ACTIONS} = require('../lib/audit');

class User extends BaseUser {

    static get $visible() {
        return ['_id', 'name', 'username', 'email', 'avatar', 'roles', 'orders', 'addresses'];
    }

    static get $schema() {

        let addressSchema = new Schema({
            _id: {type: String, required: true},
            addressText: {type: String, required: true}
        });

        return Object.assign({}, BaseUser.$schema, {
            name: {type: String},
            email: {type: String},
            orders: [{type: Schema.Types.ObjectId, ref: 'Order'}],
            addresses: [addressSchema],
            roles: {type: Array},
            avatar: {type: String}
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
