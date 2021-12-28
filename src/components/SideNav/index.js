import React from 'react';
import { connect } from 'react-redux'

import './sidenav.scss';

class SideNav extends React.Component {
  getActiveClass() {
    return this.props.isActive ? 'active' : '';
  }
  render() {
    return <div className={`sidenav ${this.getActiveClass()}`}>
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
const stateMapper = (state) => ({isActive: state.sidebar.isSidebarActive});
export default connect(stateMapper)(SideNav);
