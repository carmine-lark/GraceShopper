/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('Validations',()=>{

    it('requires Name', async()=>{
      const product = Product.build({
        price: 34,
        description: 'Tasty treat sounds great',
        prodImg: 'example.png'
      })
      try{
        await product.validate()
        throw Error("validation was successful but should have failed if name is undefined")
      } catch(err){
        expect(err.message).to.contain('name can not be null')
      }
    })

    it('requires a real name', async()=>{
      const product = Product.build({
        name: '',
        price: 34,
        description: 'Tasty treat sounds great',
        prodImg: 'example.png'
      })
      try{
        await product.validate()
        throw Error("validation was successful but should have failed if name is not empty")
      } catch(err){
        expect(err.message).to.contain('name can not be empty')
      }
    })

    it('requires price', async()=>{
      const product = Product.build({
        name: 'Madeleine',
        description: 'Tasty treat sounds great',
        prodImg: 'example.png'
      })
      try{
        await product.validate()
        throw Error("validation was successful but should have failed if price is undefined")
      } catch(err){
        expect(err.message).to.contain('price can not be null')
      }
    })

    it('requires price above 0', async()=>{
      const product = Product.build({
        name: 'Madeleine',
        price: 0,
        description: 'Tasty treat sounds great',
        prodImg: 'example.png'
      })
      try{
        await product.validate()
        throw Error("validation was successful but should have failed if price is 0")
      } catch(err){
        expect(err.message).to.contain('price can not be 0')
      }
    })



  })

  describe('instanceMethods', () => {

      beforeEach(async () => {
        madeleine = await Product.create({
          name: 'Madeleine',
          price: 34,
          description: 'Tasty treat sounds great',
          prodImg: 'example.png'
        })
      })


      it('returns the price of the product multiplied by the given quantity', () => {
        expect(madeleine.getPrice(3)).to.be.equal(102)
      })


  }) // end describe('instanceMethods')
}) // end describe('User model')
