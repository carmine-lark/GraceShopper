import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProduct } from '../store/product'
import AddCart from "../components/AddCart"

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    console.log('singleProduct', this.props.product.products)
  }
  componentDidMount() {
    console.log('compdidMount')
    this.props.fetchProduct(this.props.match.params.id)
  }


  render() {

    return (
<div>
      <div className="card" key={this.props.product.product.id}>
        <img width='120px' height='auto' src={this.props.product.product.image}></img>
        <br />
        <div className="container">
          <p className="productname" > {this.props.product.product.name}</p>
        <br />
         <p className="price">{'$'}{' '}{this.props.product.product.price * 0.01}</p>
        <br />
          <h5> {this.props.product.product.description}</h5>
        </div>
      </div>

      <div>
        < AddCart prod={this.props.product.product} />
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
