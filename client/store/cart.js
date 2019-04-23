import axios from 'axios'
import history from '../history'
import store from './index'
import session from 'express-session'

const initialState = {
  cartItems: [],
  quantity: {}
}

//Array.include(Object) does not work, so I guess I'll just add my own Object Equality Checker.
//So, this is actually a bit of a problem- the objects loaded from our backend are actually unique objects, and therefore do not reference the Products we pulled from the store
//The ideal solution would be to complete rewrite cartItems to only store product.ids and convert the product store to store products in an Object. This would enable us to pull the data using the product id as a key.
//function containsObj- returns a boolean check and figures out if the given object exists in the given array.
const containsObject = (obj, arr) => {
  let ansBool = false
  arr.map(item => {
    if (item.hasOwnProperty('id') && item.id === obj.id) {
      ansBool = true
    }
  })
  return ansBool
}

const GET_CART = 'GET_CART'
const ADD_PRODUCT = 'ADD_PRODUCT'
const REMOVE_ITEM = 'REMOVE_ITEM'
const SAVE_CART = 'SAVE_CART'
const ORDER_CART = 'ORDER_CART'
const LOAD_CART = 'LOAD_CART'

const getCart = () => ({type: GET_CART})
const addToCart = product => ({type: ADD_PRODUCT, product})
const removeItem = productId => ({type: REMOVE_ITEM, productId})
//Saves Cart to the Database for multi-browser usage, adding all cartItems as OrderProducts without Price
const saveCart = () => ({type: SAVE_CART})
//Saves Cart as Order, adding all cartItems as OrderProducts with Price
const orderCart = () => ({type: ORDER_CART})
//Loads the Cart associated with the cart's user
const loadCart = (products, quantity) => ({type: LOAD_CART, products, quantity})

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {...state, cartItems: state.cartItems}
    case ADD_PRODUCT:
      if (containsObject(action.product, state.cartItems)) {
        return {
          ...state,
          quantity: {
            ...state.quantity,
            [action.product.id]: state.quantity[action.product.id] + 1
          }
        }
      } else {
        console.log(session.cart)
        return {
          ...state,
          cartItems: [...state.cartItems, action.product],
          quantity: {...state.quantity, [action.product.id]: 1}
        }
      }
    case REMOVE_ITEM:
      let prodId = action.productId
      let newQuantity = Object.assign({}, state.quantity)
      delete newQuantity[prodId]
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.productId),
        quantity: newQuantity
      }
    case LOAD_CART:
      return {...state, cartItems: action.products, quantity: action.quantity}
    default:
      return state
  }
}
//delete this
export const addToCartThunk = product => {
  return dispatch => {
    const action = addToCart(product)
    dispatch(action)
  }
}

export const loadCartThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/carts/orderProducts')
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

export const saveCartThunk = cart => {
  return async dispatch => {
    try {
      const {data} = await axios.post('api/carts/', cart)
      console.log('saveCartThunk', data)
      const action = getCart()
      dispatch(action)
    } catch (err) {
      console.error(err)
    }
  }
}

export const removeItemThunk = productId => {
  return dispatch => {
    const action = removeItem(productId)
    dispatch(action)
  }
}

// export const saveCartThunk = () =>{
//   return dispatch=>{
//     axios.post(`/api/carts`)
//   }
// }
