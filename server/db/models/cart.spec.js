const {expect} = require('chai')
const db = require('../index')
const OrderProduct = db.model('orderproduct')
const Cart = db.model('Cart')
const Product = db.model('product')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('Validations', () => {

    it ('requires isOrder boolean', async() => {
      const order = Order.build({
      })
      try {
        await order.validate()
        throw Error('validation was successful but should have failed if isOrder is undefined')
      } catch (err) {
        expect(err.message).to.contain('isOrder cannot be null')
      }
    })
  })
})

