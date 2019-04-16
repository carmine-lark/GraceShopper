/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const OrderProduct = db.model('orderproduct')
const Order = db.model('order')
const Product = db.model('product')

xdescribe('OrderProduct model', () => {
  beforeEach(async() => {

    const madeleine = await Product.build({
      name: 'Madeleine',
      price: 34,
      description: 'Tasty treat sounds great',
      prodImg: 'example.png'
    });

    const order = await Order.build({
      isOrder: false
    });

    return db.sync({force: true})

  })

  describe("Validations", ()=>{
    it('requires a product foreignKey', async ()=>{
      const testOrderProd = OrderProduct.build({
        orderId: order.id,
        productId: madeleine.id,
        quantity: 3
      });
    })
  })



}) // end describe('User model')
