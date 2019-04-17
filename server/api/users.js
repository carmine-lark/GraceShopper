const router = require('express').Router()
const { User, Cart, OrderProduct, Product } = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.status(201).send(user)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.update(
      req.body
      , {
        where: { id: req.params.id },
        returning: true,
        plain: true
      })
    res.status(200).send(user)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/carts', async(req, res, next)=>{
  try {
    const carts = await Cart.findAll(
      {
        where:{userId: req.params.id}
      }
    )
    res.status(201).send(carts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/carts/:cid', async(req, res, next)=>{
  try {
    const cart = await Cart.findOne(
      {
        where: {
          userId: req.params.id,
          id: req.params.cid
        },
        include: [{model: OrderProduct}],
      }
    )
    res.status(200).send(cart)
  } catch (err) {
    next(err)
  }
})

//THIS IS FOR DEBUGGING PURPOSES. LEAVE IT HERE FOR NOW

router.get('/:id/orders/:cid/:oPid', async(req,res,next)=>{
  try {
    const ordprod = await OrderProduct.findOne(
      {
        where: {
          cartId: req.params.cid,
          id: req.params.oPid
        },
        include: [{model: Product}]
      }
    )
    res.status(200).send(ordprod)
  } catch (err) {
    next(err)
  }
})


router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'name', 'email', 'address']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne(
      {
        where: {
          id: req.params.id
        },
      }
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      //req.params.id
    )
    res.json(user)
  } catch (err) {
    next(err)
  }
})


