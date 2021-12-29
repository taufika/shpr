import React from 'react';
import { connect } from 'react-redux'
import Logo from '../../assets/shipper-logo-black.png';
import Avatar from '../../assets/default_avatar.jpg';

import { toggleSidebar } from '../../features/sidebar'

import './navbar.scss';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }
  toggleSidebar() {
    this.props.dispatch(toggleSidebar());
  }
  render() {
    return <nav className='navbar'>
      <button className='hamburger-menu' onClick={this.toggleSidebar} data-testid='navbar-hamburger'>
        <i className="fas fa-bars" />
      </button>
      <div className='logo'>
        <img src={Logo} alt='logo' className='logo' />
      </div>
      <section className='user-info'>
        <h4 className='hello'>Hello, 
          <span className='user-name'>{this.props.user.name || ''}</span>
        </h4>
        <div className='user-avatar'>
          <img src={Avatar} alt='avatar' />
        </div>
      </section>
    </nav>;
  }
};

export default connect()(Navbar);
