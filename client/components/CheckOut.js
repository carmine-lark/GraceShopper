import React, { Component } from 'react'
import { connect } from 'react-redux'
import Cart from './Cart'

const CheckOut = props => {

        return(
          <div>
          <h2> Check Out Page </h2>
           <Cart />
          <form onSubmit={props.handleSubmit} name={name}>
        <div>
          <label htmlFor="billingAddress">
            <small>Billing Address</small>
          </label>
          <input name="billingAddress" type="text" />
        </div>
        <div>
          <label htmlFor="cardNumber">
            <small>Card Number</small>
          </label>
          <input name="cardNumber" type="text" />
        </div>
      </form>
        <button type="submit">SUMBIT ORDER</button>
        </div>
        )
}

const mapDispatch = dispatch => {
    return {
      handleSubmit(evt) {
        evt.preventDefault()
        const formName = evt.target.name
        const billingAddress = evt.target.billingAddress.value
        const cardNumber = evt.target.cardNumber.value
        dispatch()
      }
    }
  }

export default connect(null, mapDispatch)(CheckOut)