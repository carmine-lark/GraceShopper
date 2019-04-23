const router = require('express').Router()

const {Cart, Product, OrderProduct} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.session.cartId) {
      console.log(req.session)
    } else if (req.session.passport) {
      req.session.cartId = await Cart.findOne({
        where: {userId: req.session.passport.user}
      }).id
    }else{
      let cart = await Cart.create({
        status: 'inCart'
      })
      req.session.cartId = cart.id
    }
    let cartList= []
    let quantity = {}
    const order = await OrderProduct.findAll({
      where: {cartId: req.session.cartId}
    })
    if(order.length){
      order.forEach(async (op)=>{
        cartList.push(await Product.findOne({where:{id: op.productId}}))
        quantity[op.productId]= op.quantity
      })
    }
    console.log('order', cartList)
    req.session.cart = cartList
    req.session.quantity = quantity
    res.send([req.session.cart, req.session.quantity])
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
    let orderProduct = await OrderProduct.findAll({
      where: {cartId: req.session.cartId}
    })
    orderProduct.forEach(op => op.destroy())
    console.log('destroyed OrderProducts')
    state.cartItems.map(item => {
      OrderProduct.create({
        quantity: state.quantity[item.id],
        storedPrice: 0,
        cartId: req.session.cartId,
        productId: item.id
      })
      req.session.quantity[item.productId] = item.quantity
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
