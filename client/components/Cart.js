import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCart, loadCartThunk } from '../store/cart'
import RemoveItem from './removeItem'
import SaveCart from './saveCart'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.totalPrice = this.totalPrice.bind(this)
  }

  handleClick() {
    console.log(this.props.userId)
    this.props.loadCartThunk()
  }

  totalPrice() {
    let ansInt = 0
    for (let key in this.props.price) {
      if (this.props.price[key]) {
        ansInt += this.props.price[key]
      }
    }
    return (ansInt).toFixed(2)
  }

  componentDidMount() {
    this.props.fetch()
  }

  render() {
    return (
      <div>
        {this.props.cartItems.map(item => {
          return (
            <div key={item.id}>
              <img width='200px' src={item.image}></img>
              <div>{item.name}</div>
              <div>{this.props.quantity[item.id]}</div>
              <div>
                <p>Price: ${(this.props.price[item.id] * 0.01).toFixed(2)}</p>
              </div>
              <RemoveItem prodId={item.id} />
            </div>
          )
        })}

        <div>
          Total Price: ${
            this.totalPrice() * 0.01
          }
        </div>
        <SaveCart />
        <button type='button' onClick={this.handleClick}>Click</button>


      </div>
    )
  }
}

const mapStateToProps = state => ({
  cartItems: state.cart.cartItems,
  quantity: state.cart.quantity,
  price: state.cart.price,
  userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
  fetch: () => {
    dispatch(fetchCart())
  },
  loadCartThunk: () => {
    dispatch(loadCartThunk())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
