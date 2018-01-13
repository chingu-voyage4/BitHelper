import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import '../stylesheets/components/Header.css';

// import './style.css';

class Header extends Component {
    constructor(props) {
        super(props)

    }
    handleClick = (e) => {
      switch (e.target.id) {
        case "add-project":
          this.props.history.push('/addProject');
          break;
        default:
          this.props.history.push('/');
      }
    }
    render () {
      console.log('Header', this.props);
      return (
        <header>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" onClick={this.handleClick}>Bears-20 App</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Auth className="nav-link" user={this.props.user} logoutUser={this.props.logoutUser}/>
                </li>
                <li className="nav-item">
                  <a className="nav-link" id="add-project" onClick={this.handleClick}>Add a Project</a>
                </li>
              </ul>
            </div>
          </nav>         
        </header>
      );
    }
  }

  const Auth = (props) =>  {
    console.log('Auth', props);
    if (props.user) {
      return (
          <div className='login'>
              <p>Welcome <a className='link' href={'/user/'+props.user._id} >{props.user.displayName}</a>
              <span> | </span><a onClick={props.logoutUser} href="">Log Out</a></p>
          </div>
      );
    } else {
      return <div className='login'><a href="/auth/github">Log In</a></div>;
    }
  }

  export default withRouter(Header);