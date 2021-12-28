import React from 'react';

import './usercard.scss';

export default class UserCard extends React.Component {
  composeDoB(dob) {
    const date = new Date(dob);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const theDate = date.getDate();
    return `${theDate.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
  }

  render() {
    const { name, picture, cell, email, dob } = this.props.user;

    return <div className='user-card'>
      <div className='header'>
        <div className='driver-id'>
          <span>Driver ID</span>
          {/* the id from API sometimes return strange number or undefined */}
          <span className='id-area'>DRV{this.props.idx + 509}</span>
        </div>
      </div>
      <div className='body'>
        <div className='pict-container'>
          <img alt='drivers profile' src={picture.medium} />
        </div>

        <div className='label'>Nama Driver</div>
        <div className='value'>{name.first} {name.last}</div>

        <div className='label'>Telepon</div>
        <div className='value'>{cell}</div>

        <div className='label'>Email</div>
        <div className='value'>{email}</div>

        <div className='label'>Tanggal Lahir</div>
        <div className='value'>{this.composeDoB(dob.date)}</div>
      </div>
    </div>
  };
}