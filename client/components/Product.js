import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product'

class Product extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
    console.log('compDidMount', this.props)
  }

  render() {
    console.log('Product Component', this.props)
    return (
        <div>{this.props.products.map(prod => {
            return (
                <div>{prod.name}</div>
            )
        })}
        </div>
    )
  }
}

const mapStateToProps = state => {
  console.log('state', state)
  return {
    products: state.product.products
  }
}

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => {
    dispatch(fetchProducts())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)
