import React, { Component } from 'react'
import { connect } from 'react-redux'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {    
    this.props.fetchProduct(prodId)
  }

  

  render () {
    return (

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
