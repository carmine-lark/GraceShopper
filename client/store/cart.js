import axios from 'axios'
import history from '../history'
import store from './index'

const initialState = {
    cartItems: [],
    quantity: {}
}

const GET_CART = 'GET_CART'
const ADD_PRODUCT = 'ADD_PRODUCT'
const REMOVE_ITEM = 'REMOVE_ITEM'
const SAVE_CART = 'SAVE_CART'
const ORDER_CART = 'ORDER_CART'
const LOAD_CART = 'LOAD_CART'


const getCart = () => ({type: GET_CART})
const addToCart = product => ({ type: ADD_PRODUCT, product })
const removeItem = (productId) => ({type: REMOVE_ITEM, productId})
//Saves Cart to the Database for multi-browser usage, adding all cartItems as OrderProducts without Price
const saveCart = () => ({type: SAVE_CART})
//Saves Cart as Order, adding all cartItems as OrderProducts with Price
const orderCart = () => ({type: ORDER_CART})
//Loads the Cart associated with the cart's user
const loadCart = (products, quantity) =>({type: LOAD_CART, products, quantity})

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_CART:
        return {...state, cartItems: state.cartItems}
        case ADD_PRODUCT:
        console.log(store)
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
        case LOAD_CART:
          return {... state, cartItems: action.products, quantity: action.quantity}
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

export const loadCartThunk = () => {
    return async dispatch => {
        try {
            const {data} = await axios.get('/carts/orderProducts')
            console.log(data)
            const action = loadCart(data[0], data[1])
            dispatch(action)
        } catch (err) {
            console.error(err)
        }
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

export const saveCartThunk = () =>{
  return dispatch=>{
    axios.post(`/api/carts`)
  }
}
