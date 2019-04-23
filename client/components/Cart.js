import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart, loadCartThunk} from '../store/cart'
import RemoveItem from './removeItem'
import SaveCart from './saveCart'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    console.log(this.props.userId)
    this.props.loadCartThunk()
  }

  componentDidMount() {
    this.props.fetch()
  }

  render() {
    let cartList
    if (!this.props.cartItems){
      cartList =  null
    }else
      cartList  =
      this.props.cartItems.map(item => {
        return (
          <div key={item.id}>
            <div>{item.name}</div>
            <div>{this.props.quantity[item.id]}</div>
            <RemoveItem prodId={item.id} />
          </div>
        )
    })
    return (
      <div>
        {cartList}
        <SaveCart />
        <button type='button' onClick={this.handleClick}>Click</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cartItems: state.cart.cartItems,
  quantity: state.cart.quantity,
  userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
  loadCartThunk: () => {
    dispatch(loadCartThunk())
  },
  fetch: () =>{
    dispatch(fetchCart())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
