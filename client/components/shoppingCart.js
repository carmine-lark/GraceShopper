import React, { Component } from 'react'
import { connect } from 'react-redux'
import RemoveItem from './removeItem'

class ShoppingCart extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  render() {
    return (
      <div>
        Hello
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cartItems: state.cart.cartItems,
  quantity: state.cart.quantity
})


export default connect(mapStateToProps, null)(ShoppingCart)

