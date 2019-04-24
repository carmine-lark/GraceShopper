const router = require('express').Router()

const {Cart, Product, OrderProduct} = require('../db/models')
module.exports = router

// if req sesion change to req session cart
router.get('/', async (req, res, next) => {
  // console.log(req.session)
  try {
    if (req.session.passport) {
      const order = await Cart.findOne({
        where: {userId: req.session.passport.user,
        status:'inCart'},
        include: [{all:true}]
      })
      console.log(order)


      res.send(order)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/orderProducts', async (req, res, next) => {
  try {
    let data
    // console.log('req.session', req.session)
    let products = []
    let quantity = {}
    if (!req.session.passport) {
      data = [[], {}]
    } else {
      let cart = await Cart.findOne({
        where: {
          userId: req.session.passport.user,
          status: 'inCart',
        },
        include: [{all:true}]
      })
      req.session.cart = []
      cart.orderProducts.forEach(async op => {
        quantity[op.productId] = op.quantity
        const product = await Product.findByPk(op.productId)
        console.log(product.dataValues)
        products.push(product.dataValues)
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
    // console.log('cartItems', state.cartItems)
    if (req.session.passport) {
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
      orderProduct.forEach(async op => {
        if (!Object.keys(state.quantity).includes(op.id)) {
          await op.destroy()
        }
      })
      // console.log()
      state.cartItems.forEach(async item => {
        // console.log('mapping over cartItems', item)
        let op = await OrderProduct.findOne({
          where: {productId: item.id}
        })
        if (!op) {
          await OrderProduct.create({
            quantity: state.quantity[item.id],
            storedPrice: 0,
            cartId: cart.id,
            productId: item.id
          })
        } else await op.update({quantity: state.quantity[item.id]})
      })
    }
  } catch (err) {
    next(err)
  }
})

router.post('/order', async (req, res, next) => {
  try {
    let state = req.body
    // console.log('cartItems', state.cartItems)
    if (req.session.passport) {
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
      orderProduct.forEach(async op => await op.destroy())
      state.cartItems.map(async item => {
        //console.log('OrderProductCreate', item.id)
        await OrderProduct.create({
          quantity: state.quantity[item.id],
          storedPrice: item.price,
          cartId: cart.id,
          productId: item.id
        })
      })
    }
  } catch (err) {
    next(err)
  }
})
