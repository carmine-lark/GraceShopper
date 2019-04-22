import React, {Component} from 'react'
import {connect} from 'react-redux'
import {saveCartThunk} from '../store/cart'

class SaveCartButton extends Component{
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(){
        this.props.saveCart(this.props.cart)
    }
    render(){
        return(
            <button type = 'button' onClick = {this.handleClick}>Save Cart</button>
        )
    }
}

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
    saveCart: (cart) => dispatch(saveCartThunk(cart))
})

export default connect(mapStateToProps, mapDispatchToProps)(SaveCartButton)
