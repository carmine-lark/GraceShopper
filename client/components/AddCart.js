import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addToCartThunk, saveCartThunk, fetchCart } from '../store/cart'

class AddCart extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.props.add(this.props.prod, 2)
        console.log(this.props.cart)
        this.props.saveCart(this.props.cart)
    }

    componentDidMount(){
      this.props.fetch()
    }

    render() {
        return (
            <button key={this.props.prod.id} type='button' onClick={this.handleClick}>Add To Cart</button>
        )
    }
}

const mapStateToProps = state => ({
  cart: state.cart
})
const mapDispatchToProps = dispatch => ({
  add: (prod, number) => dispatch(addToCartThunk(prod, number)),
  saveCart: (cart) => dispatch(saveCartThunk(cart)),
  fetch: () => dispatch(fetchCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(AddCart)
