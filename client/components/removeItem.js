import React, {Component} from 'react'
import {connect} from 'react-redux'
import {removeItemThunk} from '../store/cart'

class RemoveItem extends Component{
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(){
        this.props.removeItem(this.props.prodId)
    }
    render(){
        return(
            <button onClick = {this.handleClick}></button>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    removeItem: (prodId) => dispatch(removeItemThunk(prodId))
})

export default connect(null, mapDispatchToProps)(RemoveItem)