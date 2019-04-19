const router = require('express').Router()
const { Cart, User, Product, OrderProduct } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const order = await Cart.findAll({
            attributes: ['userId',]
        })
    } catch (err) {
        next(err)
    }
})

