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
    let quantity = this.props.quantity
    let products = this.props.products
    if (!quantity){
      cartList =  null
    }else
      cartList  =
      Object.keys(quantity).map(itemId => {
        return (
          <div key={itemId}>
            <div>{products[itemId].name}</div>
            <div>{quantity[itemId]}</div>
            <RemoveItem prodId={itemId} />
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

  quantity: state.cart.quantity,
  userId: state.user.id,
  products: state.product.products
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
