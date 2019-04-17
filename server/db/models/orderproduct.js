const Sequelize = require('sequelize');
const db = require('../db');
const Op = Sequelize.Op;

const OrderProduct = db.define('orderproduct', {
	quantity: {
		type: Sequelize.INTEGER,
		defaultValue: 1
	}
});


// I realised we don't need this portion of the code that's why i commented it out
// OrderProduct.prototype.increment = async function(oId, pId, quantity = 1) {
// 	let cartQuantity = await OrderProduct.findOne({
// 		quantity: {
// 			where: Sequelize.and(
// 				{
// 					orderId: oId
// 				},
// 				{
// 					prductId: pId
// 				}
// 			)
// 		}
// 	});
// 	let incrementedQuantity = cartQuantity + quantity;
// 	OrderProduct.update({
// 		quantity: incrementedQuantity
// 	});
// };

// OrderProduct.prototype.decrement = async function(oId, pId, quantity = 1) {
// 	let cartQuantity = await OrderProduct.findOne({
// 		quantity: {
// 			where: Sequelize.and(
// 				{
// 					orderId: oId
// 				},
// 				{
// 					prductId: pId
// 				}
// 			)
// 		}
// 	});
// 	let decrementedQuantity = cartQuantity - quantity;
// 	OrderProduct.update({
// 		quantity: decrementedQuantity
// 	});
// };

module.exports = OrderProduct;
