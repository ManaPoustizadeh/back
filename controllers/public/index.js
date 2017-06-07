const PublicController = require('./public');
const TestController = require('./test');
const FoodController  = require('./food');

module.exports = [
    PublicController,
    {prefix: '/test', routes: TestController},
    {prefix: '/food', routes: FoodController},
];
