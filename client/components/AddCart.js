import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addToCartThunk } from '../store/cart'

class AddCart extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.props.add(this.props.prod)
    }
    render() {
        return (
            <button onClick={this.handleClick}>Add To Cart</button>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    add: (prodId) => dispatch(addToCartThunk(prodId))
})

export default connect(null, mapDispatchToProps)(AddCart)