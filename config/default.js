/**
 * Created by rajab on 5/28/2017.
 */
module.exports = {

    /**
     * Configure mongodb
     */
    mongo: {
        connections: {
            default: {uri: 'localhost/buffet'}
        }
    },


    /**
     * Configure auth
     */
    auth: {
        secret: 'default',
        client: {
            discover_url: 'https://sso.aut.ac.ir',
            client_id: 'ticketing',
            client_secret: ''
        }
    },


};

