const router = require('express').Router()

const {Cart, User, Product, OrderProduct} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.session.cartId) {
      console.log(req.session)
    } else if (req.session.passport) {
      req.session.cartId = await Cart.findOne({
        where: {userId: req.session.passport.user}
      }).id
    }
    const order = await OrderProduct.findAll({
      where: {cartId: req.session.cartId}
    })
    console.log('order', order)
    res.send(order)
  } catch (err) {
    next(err)
  }
})

router.get('/orderProducts', async (req, res, next) => {
  try {
    let data
    console.log('req.session', req.session.cartId)
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
      orderProduct.forEach( op => {
        quantity[op.product.id] = op.quantity
        products.push(op.product)
        if (!req.session.cart.includes(op.id)) {
          req.session.cart.push(op.id)
        }
      })
      req.session.cartId = cart.id
      req.session.cart = []
      req.session.quantity = {}
      data = [req.session.cart, req.session.quantity]
    }
    console.log('req.session end', req.session)
    res.status(200).send(data)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let state = req.body
    console.log('cartItems', state.cartItems)
    // if (req.session.passport) {
    //   cart = await Cart.findOne({
    //     where: {
    //       userId: req.session.passport.user,
    //       status: 'inCart'
    //     }
    //   })
    //   if (!cart) {
    //     cart = await Cart.create({
    //       userId: req.session.passport.user,
    //       status: 'inCart'
    //     })
    //   }
    // }
    if(!req.session.cartId){
      let cart = await Cart.create({
        status: 'inCart'
      })
      req.session.cartId = 1
    }
    let orderProduct = await OrderProduct.findAll({
      where: {cartId: req.session.cartId}
    })
    orderProduct.forEach(op => op.destroy())
    console.log()
    state.cartItems.map(item => {
      OrderProduct.create({
        quantity: state.quantity[item.id],
        storedPrice: 0,
        cartId: cart.id,
        productId: item.id
      })
    })
  } catch (err) {
    next(err)
  }
})

router.post('/order', async (req, res, next) => {
  try {
    let state = req.body
    console.log('cartItems', state.cartItems)
    let cart = await Cart.findOne({
      where: {
        userId: req.session.passport.user,
        status: 'inCart'
      }
    })
    if (!cart) {
      cart = await Cart.create({
        userId: req.session.passport.user,
        status: 'inCart'
      })
    }
    let orderProduct = await OrderProduct.findAll({
      where: {cartId: cart.id}
    })
    await cart.update({status: 'ordered'})
    orderProduct.forEach(op => op.destroy())
    console.log()
    state.cartItems.map(item => {
      OrderProduct.create({
        quantity: state.quantity[item.id],
        storedPrice: item.price,
        cartId: cart.id,
        productId: item.id
      })
    })
  } catch (err) {
    next(err)
  }
})
