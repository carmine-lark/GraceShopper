const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next)=>{ // secure ... as long as we have a way f
  try {
    if (!req.session.cart){
      req.session.cart = []
  } else {
      req.session.cart.push('hello')
  }
  console.log(req.session.cart)
    const products = await Product.findAll({
    
    })
    res.status(200).send(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req,res,next)=>{ 
  try {
    const product = await Product.findByPk(Number(req.params.id))
    res.status(200).send(product)
  } catch (err) {
    next(err)
  }
})
