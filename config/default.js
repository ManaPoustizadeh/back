/**
 * Created by rajab on 5/28/2017.
 */
module.exports = {

    /**
     * Configure mongodb
     */
    mongo: {
        connections: {
            default: {uri: 'mongodb://localhost:27017/amdb'}
        }
    },

    host: 'http://127.0.0.1',

    payload: {
        output: 'stream',
        allow: 'multipart/form-data' // important
    },

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

