const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order',{
 isOrder: {
   type: Sequelize.BOOLEAN,
   allowNull: false,
   defaultValue: false,
 }
})

module.exports = Order
