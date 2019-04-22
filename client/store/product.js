import axios from 'axios'
import history from '../history'

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const GET_PRODUCT = 'GET_PRODUCT'

//INITIAL STATE

const initialState= {
  products: [],
  product: {}
}


// Action Creators
const getProducts = products => ({type: GET_ALL_PRODUCTS, products})
const removeProduct = (productId) => ({type: REMOVE_PRODUCT, productId})
const getProduct = product => ({type: GET_PRODUCT, product})

// Reducer

export default function(state = initialState, action) {
    switch (action.type){
        case GET_ALL_PRODUCTS:
            return { ...state, products: action.products }
        case GET_PRODUCT:
          return{... state, product: action.product}
        default:
            return state
    }
}

//Thunk



export const fetchProducts = () => {
    console.log('thunk')
    return dispatch => {
        axios.get('/api/products')
        .then(res => res.data)
         .then(products => {
             console.log(products)
             const action = getProducts(products)
             dispatch(action)
            })
            .catch(err => console.error('Failed to get products', err))
    }
}

export const fetchProduct = (prodId) =>{
  return dispatch =>{
    axios.get(`/products/${prodId}`)
      .then(({data}) => dispatch(getProduct(data.product)))
      .catch(err => console.error('Failed to get product', err))
  }
}