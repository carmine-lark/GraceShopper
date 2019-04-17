const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body) // be clear about what we will allow a user to create
    res.status(201).send(user)
  } catch (err) {
      next(err)
  }
})

router.put('/:id', async (req, res, next) => { // check if user id is === to the user being updated
  try {
    const user = await User.update(
      req.body
    , {
      where: {id: req.params.id},
      returning: true,
      plain: true
    })
    res.status(200).send(user)
  } catch (err) {
      next(err)
  }
})

router.get('/', async (req, res, next) => { // only for admin
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

router.get('/:id', async (req, res, next) => { // check for user id
  try {
    const user = await User.findByPk(
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      req.params.id
    )
    res.json(user)
  } catch (err) {
    next(err)
  }
})


