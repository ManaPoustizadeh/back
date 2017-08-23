const AdminBaseController = require('./_base');
const Boom = require('boom');
const {User,Order, Category, Food} = require('../../models');

class AdminController extends AdminBaseController {


    constructor(opts) {
        super({
            models: {},
        });
    }

    async $id(request, reply, {id}) {
        let user = User.findOne({
            _id: id
        }).populate({
            path: 'orders',
            populate: {
                path: 'foods',
                model: 'Food'
            }
        });
        reply(user);
    }

    async order_post(request, reply) {
        const filter = request.payload.obj.filter;
        const perPage = request.payload.obj.perPage;
        const curPage = request.payload.obj.curPage;
        let cur = curPage == 0 ? 0 : curPage - 1;
        let filterOrder = await Order.find({
            status: {
                $in: filter
            },
            paid: true
        });
        let orders = await Order.find({
            status: {
                $in: filter
            },
            paid: true
        }).populate('foods').skip(perPage * cur).limit(perPage);
        if (filter.length == 0) {
            filterOrder = await Order.find({
                paid: true
            });
            orders = await Order.find({
                paid: true
            }).populate('foods').skip(perPage * cur).limit(perPage);
        }
        reply({
            orders,
            count: filterOrder.length
        });
    }

    async category_$id_delete(request, reply, {id}) {
        await Category.findOne({
            _id: id
        }).remove().exec()
        reply({
            status: 'ok'
        })
    }

    async food_$id_put(request, reply, {id}) {
        let name = request.payload.name
        let price = request.payload.price
        //let picture = request.payload.picture
        let available = request.payload.available
        let catId = request.payload.catId
        let oldCatId = request.payload.oldCatId

        await Food.findByIdAndUpdate(id, {
            $set: {
                name: name,
                price: price,
                available: available
            }
        }).exec()

        let food
        await Food.findOne({
            '_id': id
        }, function (err, item) {
            if (err) return handleError(err)
            food = item
        })
        await Category.update({
            _id: oldCatId
        }, {
            $pullAll: {
                foods: [food._id]
            }
        })
        await Category.findByIdAndUpdate(catId, {
            $push: {
                "foods": food
            }
        }).exec()

        reply({
            status: 'ok'
        })

    }

    async category_$id_put(request, reply, {id}) {
        let name = request.payload.name
        await Category.findByIdAndUpdate(id, {
            $set: {
                name: name
            }
        }).exec()
        reply({
            status: 'ok'
        })

    }

    async food_$id_delete(request, reply, {id}) {
        await Food.findOne({
            _id: id
        }).remove().exec()
        reply({
            status: 'ok'
        })
    }

    async category_post(request, reply) {
        var name = request.payload.name
        let order = 0
        await Category.find().count(function (err, count) {
            if (err) console.log('error', err)
            order = count
        })
        var newCat = await new Category({
            name: name,
            foods: [],
            order: order + 1
        })
        newCat.save()
        reply(newCat)
    }

    async food_post(request, reply) {
        var name = request.payload.name
        var price = request.payload.price
        var file = request.payload.file
        var catId = request.payload.catId
        var available = request.payload.available
        var quantity = request.payload.quantity


        let order = 0
        await Category.find({
            _id: catId
        }).count(function (err, count) {
            if (err) console.log('error', err)
            order = count
        })
        var newFood = await new Food({
            name: name,
            price: price,
            order: order + 1,
            quantity: quantity,
            available: available
        })
        await newFood.save()
        await Category.update({
            _id: catId
        }, {
            $push: {
                foods: newFood._id
            }
        })
        reply(newFood)
    }

}

module.exports = AdminController;