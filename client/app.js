import React from 'react'
import Product from './components/Product'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Product />
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
