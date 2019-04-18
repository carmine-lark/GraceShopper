import React, { Component } from 'react'
import { connect } from 'react-redux'
import {fetchCart} from '../store/cart'

class Cart extends Component {
  componentDidMount() {
    this.props.fetch()
  }

  render() {
    return (
        <div>
            {
              this.props.cartItems.map(item => { 
                return (
                  <h3>
                    {
                      item.name
                    }
                  </h3>
                )
              })
            }
        </div>
    )
  }
}

const mapStateToProps = state => ({
   cartItems: state.cart.cartItems
})

const mapDispatchToProps = dispatch => ({
  fetch: () => {
    dispatch(fetchCart())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)