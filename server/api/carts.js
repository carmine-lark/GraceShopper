const router = require('express').Router()

const {Cart, Product, OrderProduct} = require('../db/models')
module.exports = router

// if req sesion change to req session cart
router.get('/', async (req, res, next) => {
  console.log(req.session)
  try {
    let cart =[]
    if (!req.session.passport){
      if(!req.session.cart){
        req.session.cart = []
        req.session.quantity ={}
      }
      cart = req.session.cart
      res.send(req.session.cart, req.session.quantity)
    }else{
      cart = await Cart.findOrCreate({
        where: {
          userId: req.session.passport.user,
          status: 'inCart'
        },
        include: [{all:true}]
      })

      console.log('orderList', cart)
      res.send([req.session.cart, req.session.quantity])
    }
    console.log('session.cart', req.session.cart)

  } catch (err) {
    next(err)
  }
})

router.get('/orderProducts', async (req, res, next) => {
  try {
    let data = req.session.cart
    console.log('req.session end', req.session)
    res.status(200).send(data)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let bodyCart = req.body.cartItems
    let bodyQuantity = req.body.quantity
    console.log('body Cart?', req.body)
    req.session.cart = bodyCart
    req.session.quantity= bodyQuantity
    res.status(201)
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
