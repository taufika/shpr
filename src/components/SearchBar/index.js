import React from 'react';

import './searchbar.scss';

export default class SearchBar extends React.Component {
  handleInput(e) {
    this.props.keywordHandler(e.target.value);
  }

  render() {
    return <div className='search-bar'>
      <div className='title-area'>
        <h1>Driver Management</h1>
        <h3>Data driver yang bekerja dengan Anda.</h3>
      </div>
      <div className='search-area'>
        <div className='search-icon'>
          <i className="fas fa-search"></i>
        </div>
        <input value={this.props.keyword} placeholder='Cari Driver' onChange={this.handleInput.bind(this)}/>
        <button>
          Tambah Driver
          <i className="fas fa-plus"></i>
        </button>
      </div>
    </div>;
  };
}