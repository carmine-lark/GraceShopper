'use strict'

const db = require('../server/db')

const { Product, User, OrderProduct, Cart } = require('../server/db/models')



async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')

  await Promise.all([
    Product.create(
      { name: 'Madeleine', price: 34, description: 'tasty treat', image: 'https://previews.123rf.com/images/jirkaejc/jirkaejc1305/jirkaejc130500065/19698284-madeleine-cookies-on-white-background.jpg' }),
      Product.create({ name: 'Choclate Chip', price: 34, description: 'tasty treat', image: 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Ffood.fnr.sndimg.com%2Fcontent%2Fdam%2Fimages%2Ffood%2Ffullset%2F2014%2F7%2F17%2F1%2FFN_Simple-Chocolate-Chip-Cookies_s4x3.jpg.rend.hgtvcom.616.462.suffix%2F1438794106265.jpeg&f=1' }),
      Product.create({ name: 'Cup Cake', price: 37, description: 'tasty cup cake treat', image: 'https://sugarspunrun.com/wp-content/uploads/2018/02/Pinata-cupcakes-recipe-1-of-1-2.jpg' }),
      Product.create({ name: 'Cheese Cake', price: 44, description: 'New Yorks Best', image: 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.seriouseats.com%2Frecipes%2Fimages%2F2017%2F06%2F20170526-no-bake-cheesecake-vicky-wasik-18-1500x1125.jpg&f=1' }),
      Product.create({ name: 'Napoleon', price: 375, description: 'The best!', image: 'https://i.etsystatic.com/6055149/r/il/dbc3e8/1805840637/il_794xN.1805840637_ewav.jpg' }),
      Product.create({ name: 'Tart', price: 314, description: 'tarty!', image: 'https://www.aprettylifeinthesuburbs.com/wp-content/uploads/2013/07/Rasperry-Vanilla-Bean-Cream-Tarts-F.jpg' }),
      User.create({ name: 'Cody', address: '101 Dalmation Lane', email: 'cody@email.com', password: '123' }),
      User.create({ name: 'Murphy', address: '404 Persian Lane', email: 'murphy@email.com', password: '123' }),
      Cart.create({ status: 'inCart' }),
      Cart.create({ status: 'inCart' }),
      OrderProduct.create({ quantity: 4, productid: 1, cartid: 2, storedPrice: 0 }),
      OrderProduct.create({ quantity: 2, productid: 2, cartid: 2, storedPrice: 1 })
  ])

  // console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
