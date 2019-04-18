import axios from 'axios'
import history from '../history'

const initialState = {
    cartItems: [],
    quantity: {}
}

const GET_CART = 'GET_CART'
const ADD_PRODUCT = 'ADD_PRODUCT'
const REMOVE_ITEM = 'REMOVE_ITEM'


const getCart = () => ({type: GET_CART})
const addToCart = product => ({ type: ADD_PRODUCT, product })
const removeItem = (productId) => ({type: REMOVE_ITEM, productId})


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
        case REMOVE_ITEM:
            let prodId = action.productId
            let newQuantity = Object.assign({}, state.quantity)
            delete newQuantity[prodId]
            return {... state, cartItems: state.cartItems.filter( item => item.id!== action.productId), quantity: newQuantity}
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

export const removeItemThunk = productId =>{
    return dispatch => {
        const action = removeItem( productId)
        dispatch( action )
    }
}