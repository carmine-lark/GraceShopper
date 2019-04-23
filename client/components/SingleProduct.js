import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProduct } from '../store/product'


class SingleProduct extends Component {
  constructor(props) {
    super(props)
    console.log('singleProduct',this.props.product.products)
  }
  componentDidMount() {
    console.log('compdidMount')
    this.props.fetchProduct(this.props.match.params.id)
  }


  render () {
    console.log ('single prod props', this.props.product)


    return (
      <div key={this.props.product.product.id}>
        <img width='120px' height='auto' src={this.props.product.product.image}></img>
        <br />
        {this.props.product.product.name}
        <br />
        {this.props.product.product.price}
        <br />
        {this.props.product.product.description}
      </div>
      // <div>
      // {
      //   this.props.product.products.map(prod => {
          
      //     if (+this.props.match.params.id === prod.id)
      //     return (
      //       <div key={prod.id}>
      //       {prod.name}
      //       </div>
      //     )
      //   })
      // }
      // </div>
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
