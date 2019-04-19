const router = require('express').Router()
const { Cart, User, Product, OrderProduct } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const order = await Cart.findAll({
            attributes: ['userId']
        })
        res.send(order)
    } catch (err) {
        next(err)
    }
})

router.get('/orderProducts', async(req,res, next)=>{
    try{
        let data 
        if (!req.session.passport){
            data ={'hello': 'hello'}
        }else {
            let cart = await Cart.findOne({
                where: {userId: req.session.passport.user,
                    status: 'inCart'}
            })
            let orderProduct = await OrderProduct.findAll({
                where: {cartId: cart.id},
                include: {model:Product}
            })
            let products = []
            let quantity = {}
            orderProduct.forEach(async op => {
                quantity[op.id]= op.quantity
                products.push(op.product)
            })
            data= [products, quantity]
        }
        res.status(200).send(data)

    }catch(err){
        next(err)
    }
})

