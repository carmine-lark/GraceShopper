const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  // secure ... as long as we have a way f
  try {
    const products = await Product.findAll({})
    console.log(req.session.cart)
    res.status(200).send(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(Number(req.params.id))
    res.status(200).send(product)
  } catch (err) {
    next(err)
  }
})
