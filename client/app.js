import React from 'react'
import Product from './components/Product'

import {Navbar} from './components'
import Routes from './routes'
import Cart from './components/Cart';
import SingleProduct from './components/SingleProduct'


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
