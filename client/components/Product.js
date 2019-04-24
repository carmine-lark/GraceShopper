import React from 'react'
import { connect } from 'react-redux'
import AddCart from './AddCart';
import { fetchProducts } from '../store/product'
import SingleProduct from './SingleProduct';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'


class Product extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    return (
      <div>
        <div className="productlist" >
          {this.props.products.map(prod => {
            return (
              <div key={prod.id} className="product" >
                <img className="img" width='160px' height="155px" src={prod.image}></img>
                <br />
                 <p  className="productname">{prod.name}</p>
                <br />
<<<<<<< HEAD
                $ {(prod.price * 0.01).toFixed(2)}
=======
                <p className="price">{'$'}{' '}{prod.price * 0.01}</p>
>>>>>>> master
                <br />

                < AddCart prod={prod} />
                <Button variant="contained" color="primary" prod={prod} component={Link} to={`/product/${prod.id}`}>More ... </Button>
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
