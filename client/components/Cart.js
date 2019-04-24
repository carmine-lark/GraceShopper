import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart, loadCartThunk} from '../store/cart'
import RemoveItem from './removeItem'
import SaveCart from './saveCart'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.totalPrice = this.totalPrice.bind(this)
  }

  componentDidMount(){
    this.props.loadCartThunk()
  }

  handleClick() {
    console.log(this.props.userId)
    this.props.loadCartThunk()
  }


  totalPrice() {
    let ansInt = 0
    for (let key in this.props.quantity) {
      if (this.props.price[key]) {
        let quantity = +this.props.quantity[key]
        let useProduct = this.props.products
          .find(prod => prod.id === +key)
        ansInt+= ((useProduct.price*quantity)*0.01).toFixed(2)
      }
    }
    return ansInt
  }

  componentDidMount() {
    this.props.fetch()
  }

  cartList() {
    if (this.props.quantity) {
      for (let key in this.props.quantity) {
        if (this.props.quantity[key]) {
          let product = this.props.products.find(prod => prod.id === +key)
          let quantity = this.props.quantity[key]
          console.log(product)
          return (
            <div key={key}>
              <img width="200px" src={product.image} />
              <div>{product.name}</div>
              <div>{quantity}</div>
              <div>
                <p>Price: ${(product.price * quantity * 0.01).toFixed(2)}</p>
              </div>
            </div>
          )
        }
      }
    }
  }

  render() {
    return (
      <div>
        {this.cartList()}

        <div>Total Price: ${this.totalPrice() * 0.01}</div>
        <SaveCart />
        <button type="button" onClick={this.handleClick}>
          Click
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.product.products,
  quantity: state.cart.quantity,
  price: state.cart.price,
  userId: state.user.id,
  cart: state.cart
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
