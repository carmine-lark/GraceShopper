import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {loadCartThunk} from '../store/cart'
/**
 * COMPONENT
 */
class UserHome extends React.Component {


   componentDidMount() {
      console.log('match.....', this.props.match)
   }


 render() {
   return (
     <div>
       <h3>Welcome, {this.props.email}</h3>
     </div>
   )
 }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

const mapDispatch = dispatch => ({
   fetch: userid => dispatch(loadCartThunk(userid))
})

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
