const router = require('express').Router()

const {Cart, Product, OrderProduct} = require('../db/models')
module.exports = router

// if req sesion change to req session cart
router.get('/', async (req, res, next) => {
  console.log(req.session)
  try {
    let cart = []
    if (!req.session.passport) {
      if (!req.session.cartId) {
        req.session.cart = []
        req.session.quantity = {}
        cart = await Cart.create({
          status: 'inCart'
        })
        req.session.cartId = cart.id
        console.log('no CartId Session', req.session)
      }
      res.send([req.session.cart, req.session.quantity])
    } else {
      cart = await Cart.findCreateFind({
        where: {
          userId: req.session.passport.user,
          status: 'inCart'
        },
        include: [{all: true}]
      })
      console.log('User, Cart findCreateFind', cart[0].dataValues.id)
      req.session.cartId = cart[0].dataValues.id
      console.log('User, no Cart Session', req.session)

      let orderProducts = await OrderProduct.findAll({
        where: {
          cartId: req.session.cartId
        }
      })
      orderProducts.forEach(async op => {
        console.log(op)
        req.session.cart.push(await Product.findByPk(op.productId))
        req.session.quantity[op.productId] = op.quantity
      })

      console.log('orderList', req.session.cart)
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
    console.log('body', req.body)
    let bodyCart = req.body.cartItems
    let bodyQuantity = req.body.quantity
    let cart = Cart.findOne({
      where:{
        id: req.session.cartId,
        status: 'inCart'
      }
    })
    if (req.session.passport) {
      cart.update({userId: req.session.passport.user})
    }
    let bodyProductIds = Object.keys(bodyQuantity)
    let opList = await OrderProduct.findAll({
      where: {
        cartId: req.session.cartId
      }
    })
    opList.forEach(op => {
      if (bodyProductIds.includes(op.id)){
        op.update({quantity: bodyQuantity[op.id]})
      }
    })

    console.log('body Cart?', req.body)
    bodyCart.forEach(prod=>{req.session.cart.push(prod)})
    for (var ind in bodyQuantity){
      if (bodyQuantity[ind]){
      req.session.quantity[ind] = bodyQuantity[ind]
      }
    }

    console.log('req session', req.session)
    res.sendStatus(200)
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
    let orderProduct = await OrderProduct.create({
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
