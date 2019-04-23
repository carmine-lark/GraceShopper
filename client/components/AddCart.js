import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addToCart, loadCartThunk, saveCartThunk, fetchCart } from '../store/cart'

class AddCart extends Component {
    constructor(props) {
        super(props)
        this.state={
          quantity: 1
        }
        this.handleClick = this.handleClick.bind(this)
    }

    async handleClick() {
        this.props.add(this.props.prod, this.state.quantity)
        await this.props.saveCartThunk(this.props.cart)
        await this.props.loadCartThunk(this.props.cart)
    }

    componentDidMount(){
      this.props.fetchCart()
    }


    render() {
        return (
            <button key={this.props.prod.id} type='button' onClick={this.handleClick}>Add To Cart</button>
        )
    }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
})

const mapDispatchToProps = dispatch => ({
  fetchCart: () => dispatch(fetchCart()),
  add: (prodId, number) => dispatch(addToCart(prodId, number)),
  loadCartThunk: () => dispatch(loadCartThunk()),
  saveCartThunk: (cart) => dispatch(saveCartThunk(cart))

})

export default connect(mapStateToProps, mapDispatchToProps)(AddCart)
