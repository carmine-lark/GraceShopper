const router = require('express').Router()

const {Cart, Product, OrderProduct} = require('../db/models')
module.exports = router

// Req.Session design:
// Passport - created when user is logged in,carries user id in req.session.passport.user
// Cart - object that contains the ids of Products as keys, with their quantities as values


// Purpose: To the get the current cart
//associated with the session or the user
// Input: request, response, next
// Intended request: nothing
// Intended Output: a collection of all OrderProducts associated with the session's cart
router.get('/', async (req, res, next) => {
  console.log(req.session)
  try {
    let cart = {}
    if (!req.session.passport) {
      if (!req.session.cartId) {
        req.session.cart = {}
        req.session.quantity= {}
        cart = req.session.quantity
        console.log('no quantity?', req.session.quantity)
      }

      res.send(req.session.quantity)
    } else {
      cart = await Cart.findCreateFind({
        where: {
          userId: req.session.passport.user,
          status: 'inCart'
        },
        include: [{all: true}]
      })
      console.log('User, Cart findCreateFind', cart[0])
      req.session.cartId = cart[0].dataValues.id
      cart.orderProducts.forEach(op=>{
        console.log( op)
      })

      res.send(req.session.quantity)
    }
    console.log('session.cart', req.session.quantity)
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
  console.log('body', req.body)
  try {
    const bodyId = req.body[0]
    const bodyQuant = req.body[1]
    console.log('session start', req.session)
    if(!req.user){
      if (Object.keys(req.session.quantity).length){
        if(req.session.quantity[bodyId]){
          console.log('session quantity as an entry for this product')
          req.session.quantity[bodyId] += bodyQuant
        }else{
          console.log('session quantity is not defined')
          req.session.quantity[bodyId] = bodyQuant
        }
      }else {
        req.session.quantity[bodyId] = bodyQuant
      }
    }else {
      console.log('cartId', req.session.cartId)
      const existingOrderProd = await OrderProduct.findOne({
        where:{
          productId: bodyId,
          cartId: res.session.cartId
        }
      })
      if (existingOrderProd){
        const updateOrderProd = await existingOrderProd.update({
          quantity: existingOrderProd.quantity+ bodyQuant
        })
        req.session.quantity[bodyId] = updateOrderProd.quantity
        res.send(req.session.quantity)
      } else {
        const newOrderProd = await OrderProduct.create({
          quantity: bodyQuant,
          productId: bodyId,
          cartId: req.session.cartId
        })

        res.send(newOrderProd)
      }
    }
    console.log('req session', req.session)
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
