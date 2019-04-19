const Sequelize = require('sequelize')
const db = require('../db')


const Product = db.define('product', {
    name: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        },
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        validate: {
            notEmpty: true,
            min: 0
        },
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    },
    image: {
        type: Sequelize.STRING,
        // add default img
    }
})


module.exports = Product
