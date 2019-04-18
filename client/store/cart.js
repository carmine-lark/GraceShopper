import axios from 'axios'
import history from '../history'

const initialState = {
    cartItems: [],
    quantity: {}
}

const GET_CART = 'GET_CART'
const ADD_PRODUCT = 'ADD_PRODUCT'


const getCart = () => ({type: GET_CART})
const addToCart = product => ({ type: ADD_PRODUCT, product })


export default function(state = initialState, action) {
    switch (action.type) {
        case GET_CART:
            return {...state, cartItems: state.cartItems}
        case ADD_PRODUCT:
            if (state.cartItems.includes(action.product)) {
              return {...state, quantity: {...state.quantity, [action.product.id]: state.quantity[action.product.id] + 1}}
            } else {
                return { ...state, cartItems: [...state.cartItems, action.product], quantity: {...state.quantity, [action.product.id]: 1} }
            }
        default:
            return state
    }
}

export const addToCartThunk = (product) => {
    return dispatch => {
                const action = addToCart(product)
                dispatch(action)
    }
}

export const fetchCart = () => {
    return dispatch => {
        const action = getCart()
        dispatch(action)
    }
}