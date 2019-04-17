import axios from 'axios'
import history from '../history'

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

//INITIAL STATE

const initalState = []


// Action Creators
const getProducts = products => ({type: GET_ALL_PRODUCTS, products})
const removeProduct = (productId) => ({type: REMOVE_PRODUCT, productId})

// Reducer

export default function(state = initalState, action) {
    switch (action.type){
        case GET_ALL_PRODUCTS:
            return action.products 
        default: 
            return state
    }
}

//Thunk



export const fetchProduct = () => {
    console.log('thunk')
    return dispatch => {
        axios.get('/api/products')
        .then(res => res.data)
         .then(products => {
             const action = getProducts(products)
             dispatch(action)
            })
            .catch(err => console.error('Failed to get products', err))
    }
}
