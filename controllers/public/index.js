const MovieController = require('./movie');
const PublicController = require('./public');

module.exports = [
    PublicController, 
    {prefix: '/movie', routes: MovieController}
];
