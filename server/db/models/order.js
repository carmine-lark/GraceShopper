const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order',{
  //rename to shoppingCart or other name
  // Enum to represent diff states an order can be
 isOrder: {
   type: Sequelize.BOOLEAN,
   allowNull: false,
   defaultValue: false,
 }
})

module.exports = Order
