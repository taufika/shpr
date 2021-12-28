import React from 'react';
import Logo from '../../assets/shipper-logo-black.png';
import Avatar from '../../assets/default_avatar.jpg';

import './navbar.scss';

export default class Navbar extends React.Component {
  render() {
    return <nav className='navbar'>
      <img src={Logo} alt='logo' className='logo' />
      <section className='user-info'>
        <h4>Hello, 
          <span className='user-name'>{this.props.user.name || ''}</span>
        </h4>
        <div className='user-avatar'>
          <img src={Avatar} alt='avatar' />
        </div>
      </section>
    </nav>;
  }
};
