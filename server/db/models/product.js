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
            min: 100
        },
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    },
    image: {
        type: Sequelize.STRING
    }
})


module.exports = Product
