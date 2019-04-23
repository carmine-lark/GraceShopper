const router = require('express').Router()
const {Cart, User, Product, OrderProduct} = require('../db/models')
module.exports = router

router.get('/', async (req,res,next)=>{
  console.log(req.session)
  let cart
  let quantity
  req.session.cart = []
  req.session.quantity= {}
  try {
    if (req.session.passport.user){
      cart = Cart.findOne({where: {userId: req.session.passport.user}})
    }
    console.log(cart)
    res.send(cart)
  } catch (err) {
    next(err)
  }
})

