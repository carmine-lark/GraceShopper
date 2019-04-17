const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        console.log(req.session.cart)
        const order = await Order.findAll({
            attributes: ['userId', ]
        })
    } catch (err) {
        next(err)
    }
})