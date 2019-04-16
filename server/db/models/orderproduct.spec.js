/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const OrderProduct = db.model('orderproduct')
const Order = db.model('order')
const Product = db.model('product')

describe('OrderProduct model', () => {
  beforeEach(async() => {

    return db.sync({force: true})

  })

  describe("Validations", ()=>{
    it('requires a quantity',()=>{

      const madeleine = await Product.build({
        name: 'Madeleine',
        price: 34,
        description: 'Tasty treat sounds great',
        prodImg: 'example.png'
      })

      const order = await Order.build({
        isOrder: false
      })

      const orderproduct = OrderProduct.build({
        productId: madeleine.id,
        orderId: order.id
      })
      try{
        await orderproduct.validate()
        throw Error ("Validation was successful, but should have failed if there's no quantity")
      }catch (err) {
        expect(err.message).to.contain('quantity can not be null')
      }
    })
    it('requires must have a quantity greater than 0',()=>{

      const madeleine = await Product.build({
        name: 'Madeleine',
        price: 34,
        description: 'Tasty treat sounds great',
        prodImg: 'example.png'
      })

      const order = await Order.build({
        isOrder: false
      })

      const orderproduct = OrderProduct.build({
        productId: madeleine.id,
        orderId: order.id,
        quantity: 0
      })
      try{
        await orderproduct.validate()
        throw Error ("Validation was successful, but should have failed if the quantity is less than 1")
      }catch (err) {
        expect(err.message).to.contain('quantity must be greater than 0')
      }
    })
  })//end describe('Validations)

xdescribe('instanceMethods', () => {

  beforeEach(async () => {

  })

})



}) // end describe('User model')
