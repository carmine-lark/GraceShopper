import axios from 'axios'
import history from '../history'

const initialState = {
    cartItems: []
}

const ADD_PRODUCT = 'ADD_PRODUCT'

const addToCart = product => ({ type: ADD_PRODUCT, product })

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_PRODUCT:
            return { ...state, cartItems: [...state.cartItems, action.product] }
    }
}

export const addToCartThunk = (productId) => {
    return dispatch => {
        axios.get(`/api/products/${productId}`)
            .then(res => res.data)
            .then(product => {
                const action = addToCart(product)
                dispatch(action)
            })
            .catch(err => console.error('Failed to get products', err))
    }
}