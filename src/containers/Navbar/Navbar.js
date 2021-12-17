import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Logo from '../../images/interact-logo.png';
import { logout } from '../../store/actions/auth';
import './Navbar.css';

class Navbar extends Component {

    onLogout = e => {
      e.preventDefault();
      this.props.logout();
      this.props.history.push('/');
    }

    render() {
      return(
          <nav className="navbar navbar-light navbar-expand-lg">
            <div className="container-fluid">
            <Link to="/" className="navbar-brand">
                <img src={Logo} alt="Interact Home"/>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {this.props.currentUser.isAuthenticated ? 
            (
              <ul className="nav navbar-nav navbar-right justify-content-end">
                <li>
                  <Link to={`/users/${this.props.currentUser.user.id}/messages/`}>My Messages</Link>
                </li>
                <li>
                    <Link to={`/users/${this.props.currentUser.user.id}/messages/new`}>Create New Message</Link>
                </li>
                <li>
                    <a href="/" onClick={this.onLogout}>Logout</a>
                </li>
              </ul>
            ) :
            (
              <ul className="nav navbar-nav navbar-right">
                <li>
                    <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                    <Link to="/signin">Log in</Link>
                </li>
              </ul>
              )
              }
              </div>
            </div>    
          </nav>
      );
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, { logout })(withRouter(Navbar));