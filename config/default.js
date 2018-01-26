/**
 * Created by rajab on 5/28/2017.
 */
module.exports = {

    /**
     * Configure mongodb
     */
    mongo: {
        connections: {
            default: {uri: 'mongodb://127.0.0.1:27017/amdb'}
        }
    },

    host: 'http://127.0.0.1',

    /**
     * Configure auth
     */
    auth: {
        secret: 'default',
        client: {
            discover_url: 'https://127.0.0.1:3000',
            client_id: 'amdb',
            client_secret: ''
        }
    },

    log: {
        sentry: {
            dsn: null
        },
        audit: {},
    },

};

