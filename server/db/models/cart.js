const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart',{
 status: {
   type: Sequelize.ENUM({
     values: ['inCart', 'ordered', 'in-progress', 'shipped']
   }),
   defaultValue: 'inCart'
 }

})

module.exports = Cart
