import React from 'react'
import { connect } from 'react-redux'
import AddCart from './AddCart';
import { fetchProducts } from '../store/product'
import SingleProduct from './SingleProduct';
import { Link } from 'react-router-dom'

import { Button } from 'reactstrap';

class Product extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
    console.log('compDidMount', this.props)
  }

  handleSubmit() {

  }

  render() {
    let prods = this.props.products
    return (
      <div>
        <div>
          {Object.keys(prods).map(prod => {
            return (
              <div key={prod}>
                <img width='200px' src={prods[prod].image}></img>
                <br />
                {prods[prod].name}
                <br />
                {prods[prod].price}
                <br />

                < AddCart prod={prod} />
                <Button prod={prod} component={Link} to={`/product/${prod}`}>Details</Button>
              </div>)
          })}

        </div>
        <br />
        <br />
        <div />
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
