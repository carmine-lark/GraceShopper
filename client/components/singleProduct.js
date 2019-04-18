import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProduct } from '../store/product'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {    
    // this.props.fetchProduct()
  }

  

  render () {
    return (
      <div> {this.props.product.name} </div>
    )

  }

}

const mapStateToProps = state => ({
  product: state.product
})

const mapDispatchToProps = dispatch => ({
  fetchProduct: (prodId) => {
    dispatch(fetchProduct(prodId))
  }
})

export default connect (mapStateToProps, mapDispatchToProps)(SingleProduct)
