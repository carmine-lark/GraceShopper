const router = require('express').Router()
const { Order, User, Product, OrderProduct } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const order = await Order.findAll({
            attributes: ['userId',]
        })
    } catch (err) {
        next(err)
    }
})

router