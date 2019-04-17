const Sequelize = require('sequelize')
const db = require('../db') 

const OrderProduct = db.define('orderProduct', {
    quantity: {
        type: Sequelize.INTEGER,
        validate: {
            notEmpty: true,
        },
        allowNull: false
    },
    // no need to remove upon checkout ... freeze price per product on model as well, for future reference
})


module.exports = OrderProduct
