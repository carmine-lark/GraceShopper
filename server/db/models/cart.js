const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart',{
 status: {
   type: Sequelize.ENUM({
     values: ['in-Cart', 'ordered', 'in-progress', 'shipped']
   }),
   defaultValue: 'in-Cart'
 }

})

module.exports = Cart
