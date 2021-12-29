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

    return <div className='user-card' data-testid='user-card'>
      <div className='header'>
        <div className='driver-id'>
          <span>Driver ID</span>
          {/* the id from API sometimes return strange number or undefined */}
          <span className='id-area'>DRV{this.props.idx + 509}</span>
        </div>
        <i className="fas fa-ellipsis-h" />
      </div>
      <div className='body'>
        <div className='pict-container'>
          <img alt='drivers profile' src={picture.medium} />
        </div>

        <section className='info-container'>
          <div className='label name'>Nama Driver</div>
          <div className='value name'>{name.first}, {name.last}</div>

          <div className='label phone'>Telepon</div>
          <div className='value phone'>{cell}</div>

          <div className='label email'>Email</div>
          <div className='value email'>{email}</div>

          <div className='label dob'>Tanggal Lahir</div>
          <div className='value dob'>{this.composeDoB(dob.date)}</div>
        </section>
      </div>
    </div>
  };
}