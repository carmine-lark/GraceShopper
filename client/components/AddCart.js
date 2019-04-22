import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addToCartThunk } from '../store/cart'

class AddCart extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.props.add(this.props.prod, this.props.quantity)
    }
    render() {
        return (
            <button key={this.props.prod.id} type='button' onClick={this.handleClick}>Add To Cart</button>
        )
    }
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
  quantity: state.cart.quantity

})

const mapDispatchToProps = dispatch => ({
    add: (prodId, quantity) => dispatch(addToCartThunk(prodId, quantity))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddCart)
