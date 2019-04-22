import React from 'react'
import { connect } from 'react-redux'
import AddCart from './AddCart';
import { fetchProducts} from '../store/product'
import SingleProduct from './SingleProduct';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'


class Product extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
    console.log('compDidMount', this.props)
  }

  handleSubmit () {

  }

  render() {
    return (
      <div>
        <div>
          {this.props.products.map(prod => {
            return (
            <div key={prod.id}>
              <img width='200px' src={prod.image}></img>
              <br />
              {prod.name}
              <br />
              {prod.price}
              <br />
            < AddCart prod={prod} />
            <Button prod={prod} component={Link} to={`/product/${prod.id}`}>Details</Button>
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
