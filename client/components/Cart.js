import React, { Component } from 'react'
import { connect } from 'react-redux'
import {fetchCart} from '../store/cart'
import RemoveItem from  './removeItem'

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
                  <div key={item.id}>
                    {
                      item.name

                    }
                    <RemoveItem prodId={item.id}/>
                  </div>
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
