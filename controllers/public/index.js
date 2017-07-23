const PublicController = require('./public');
const TestController = require('./test');
const FoodController  = require('./food');
const OrderController  = require('./order');

module.exports = [
    PublicController,
    {prefix: '/test', routes: TestController},
    {prefix: '/food', routes: FoodController},
    {prefix: '/order', routes: OrderController},
];
