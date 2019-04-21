import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart, loadCartThunk} from '../store/cart'
import RemoveItem from './removeItem'

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
    return (
      <div>
        {this.props.cartItems.map(item => {
          return (
            <div key={item.id}>
              {item.name}
              <RemoveItem prodId={item.id} />
            </div>
          )
        })}
        <button onClick={this.handleClick}>Click</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cartItems: state.cart.cartItems,
  userId: state.user.id
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
