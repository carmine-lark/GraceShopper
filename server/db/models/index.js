const Sequelize = require('sequelize')
const User = require('./user')
const Product = require('./product')
const Cart = require('./cart')
const OrderProduct = require('./orderproduct')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Cart.belongsTo(User)
User.hasMany(Cart)
Cart.hasMany(OrderProduct)
OrderProduct.belongsTo(Cart)
Product.hasMany(OrderProduct)
OrderProduct.belongsTo(Product)

module.exports = {
  User,
  Product,
  Cart,
  OrderProduct
}
