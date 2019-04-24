const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  // secure ... as long as we have a way f
  try {
    const products = await Product.findAll({})
    const sendProd = {}
    products.forEach(product=>{
      sendProd[product.id] = product
    })
    console.log(req.session.cart)
    res.status(200).send(sendProd)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    let product = await Product.findOne({where: {id: Number(req.params.id)}})
    res.status(200).json(product)
  } catch (err) {
    next(err)
  }
})
