import axios from 'axios'
import history from '../history'

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

//INITIAL STATE

const products = []


// Action Creators
const getProducts = products => ({type: GET_ALL_PRODUCTS, products})
const removeProduct = (productId) => ({type: REMOVE_PRODUCT, productId})

// Reducer

export default function(state = products, action) {
    switch (action.type){
        case GET_ALL_PRODUCTS:
            return action.products 
        default: 
            return state
    }
}

//Thunk

export const fetchProduct = () => {
    return dispatch => {
         axios.get('/products/')
            .then(({data}) => dispatch(getProducts(data.products)))
            .catch(err => console.error('Failed to get products', err))
    }
}
