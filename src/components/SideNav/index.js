import React from 'react';

import './sidenav.scss';

export default class SideNav extends React.Component {
  render() {
    return <div className='sidenav'>
      <div className='nav-item'>
        <i className="fas fa-home"></i>
        <span>Beranda</span>
      </div>
      <div className='nav-item active'>
        <i className="fas fa-user"></i>
        <span>Driver Management</span>
      </div>
      <div className='nav-item'>
        <i className="far fa-calendar"></i>
        <span>Pickup</span>
      </div>
    </div>;
  };
};
