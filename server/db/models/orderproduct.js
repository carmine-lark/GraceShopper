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
    storedPrice: {
      type: Sequelize.INTEGER,
    }
})


module.exports = OrderProduct
