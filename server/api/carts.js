const router = require('express').Router()

const {Cart, User, Product, OrderProduct} = require('../db/models')
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

router.get('/orderProducts', async (req, res, next) => {
  try {
    let data
    console.log('req.session', req.session)
    if (!req.session.passport) {
      data = [[], {}]
    } else {
      let cart = await Cart.findOne({
        where: {
          userId: req.session.passport.user,
          status: 'inCart'
        }
      })
      let orderProduct = await OrderProduct.findAll({
        where: {cartId: cart.id},
        include: {model: Product}
      })
      let products = []
      let quantity = {}
      req.session.cart = []
      orderProduct.forEach(async op => {
        quantity[op.id] = op.quantity
        products.push(op.product)
        if (!req.session.cart.includes(op.id))
        {req.session.cart.push(op.id)}
      })
      data = [products, quantity]
    }
    console.log('dataStuff', data)
    res.status(200).send(data)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let state = req.body
    console.log(state)
    let cart = await Cart.findOne({
      where: {
        userId: req.session.passport.user,
        status: 'inCart'
      }
    })
    let orderProduct = await OrderProduct.findAll({
      where: {cartId: cart.id}
    })
    orderProduct.forEach(op => console.log(op))
  } catch (err) {
    next(err)
  }
})
