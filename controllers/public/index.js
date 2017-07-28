const PublicController = require('./public');
const CategoryController = require('./category');
const FoodController  = require('./food');
const OrderController  = require('./order');

module.exports = [
    PublicController,
    {prefix: '/category', routes: CategoryController},
    {prefix: '/food', routes: FoodController},
    {prefix: '/order', routes: OrderController},
];
