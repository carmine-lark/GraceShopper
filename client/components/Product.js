import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/product'

class Product extends React.Component {
  componentDidMount() {
    this.props.fetchProduct()
    console.log('compDidMount', this.props)
  }

  render() {
    console.log('Product Component', this.props)
    return (
        <div>{this.props.product.map(prod => {
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
    product: state.product
  }
}

const mapDispatchToProps = dispatch => ({
  fetchProduct: () => {
    dispatch(fetchProduct())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)
