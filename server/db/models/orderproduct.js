const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('orderproduct', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})  

{
  orderid: asdfasdf
  producid: asdfasdf
  quanity: 342
}

OrderProduct.prototype.increment = async function (orderId, productId, quantity = 1) {
  const orderproduct = await findOne({ WHERE: {
    orderId: orderId 
  

module.exports = OrderProduct
