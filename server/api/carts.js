const router = require('express').Router()

const {Cart, User, Product, OrderProduct} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  console.log('initial session', req.session)
  try {
    const order = await Cart.findAll({
      attributes: ['userId']
    })
    res.send(order)
  } catch (err) {
    next(err)
  }
})

router.post('/:id/add', async(req, res, next)=>{
  console.log('req.body', req.body)
  let cart
  let orderProduct
  try {
    if(!req.session){
      cart = await Cart.create({
        status: 'inCart'
      })
      req.session.cart = cart
      req.session.cartId = cart.id
    }else{
      cart = await Cart.findOne({
        where: {
          // userId: req.session.passport.user
        }
      })
      if (!cart){
        cart = await Cart.create({
          // userId: req.session.passport.user,
          status: 'inCart'
      })
      }
    }
    req.session.cartId = cart.id
    orderProduct = await OrderProduct.findOne({where:{productId: req.params.id, cartId: req.session.cartId}})
    if (!orderProduct){
      orderProduct = await OrderProduct.create({
        cartId: req.session.cartId,
        productId: req.params.id,
        quantity: parseInt(req.body, 10),
      })
    }
    await orderProduct.update({quantity: parseInt(req.body, 10)})

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
        req.session.quantity[op.product.id] = op.quantity
        products.push(op.product)
        console.log('op.product', op.product)
        if (!req.session.cart.includes(op.id))
        {req.session.cart.push(op.product)}
      })
      console.log('req.session cart', req.session.quantity)

      data = [req.session.cart, req.session.quantity]
    }
    res.status(200).send(data)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let state = req.body
    console.log('cartItems', state.cartItems)
    let cart = await Cart.findOne({
      where: {
        userId: req.session.passport.user,
        status: 'inCart'
      }
    })
    if (!cart){
      cart = await Cart.create({
        userId: req.session.passport.user,
        status: 'inCart'
      })
    }
    let orderProduct = await OrderProduct.findAll({
      where: {cartId: cart.id}
    })
    orderProduct.forEach(op => op.destroy())
    console.log()
    state.cartItems.map(item=>{
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
    if (!cart){
      cart = await Cart.create({
        userId: req.session.passport.user,
        status: 'inCart'
      })
    }
    let orderProduct = await OrderProduct.findAll({
      where: {cartId: cart.id}
    })
    await cart.update({status:'ordered'})
    orderProduct.forEach(op => op.destroy())
    console.log()
    state.cartItems.map(item=>{
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
