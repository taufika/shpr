import React from 'react';

import './sidenav.scss';

export default class SideNav extends React.Component {
  render() {
    return <div className='sidenav'>
      <div className='nav-item'>Beranda</div>
      <div className='nav-item active'>Driver Management</div>
      <div className='nav-item'>Pickup</div>
    </div>;
  };
};
