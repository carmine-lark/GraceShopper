import React from 'react'
import Product from './components/Product'

import {Navbar} from './components'
import Routes from './routes'
import Cart from './components/Cart';

const App = () => {
  return (
    <div>
      <Product />
      <Cart />
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
