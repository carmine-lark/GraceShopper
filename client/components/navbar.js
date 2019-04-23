import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {logout} from '../store'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  color: 'white'
};

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1>Syntactic Sugar</h1>
    <nav >
      {isLoggedIn ? (
        <div >
          <AppBar position='static'>
          <Toolbar>
          <Typography variant="h6" color="primary" >
          <Button className='navBar' component={Link} to='/home'>Home</Button>
          <Button component={Link} to='/cart'>Cart</Button>
          <Button component={Link} to='/checkout'>Check Out</Button>

          </Typography>
          
        </Toolbar>
          </ AppBar>

          
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <AppBar position='static'>
          <Toolbar>
          <Typography variant="h6" color="primary" >
          <Button component={Link} to='/home'>Home</Button>
          <Button component={Link} to='/cart'>Cart</Button>
          <Button component={Link} to='/login'>Login</Button>
          <Button component={Link} to='/signup'>Sign Up</Button>
          </Typography>
          
        </Toolbar>
          </ AppBar>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
