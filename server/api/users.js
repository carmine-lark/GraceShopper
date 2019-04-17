const router = require('express').Router()
const { User, Order } = require('../db/models')
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
        include: [{ model: Order }]
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


