import React from 'react';
import { connect } from 'react-redux'
import { useSearchParams } from 'react-router-dom';

import SearchBar from '../SearchBar';
import UserCard from '../UserCard';

import './usersdisplay.scss';

class UsersDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: parseInt(this.props.router.searchParams.get('offset') || 0, 10),
      keyword: this.props.router.searchParams.get('keyword') || '',
    }
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.getFilteredUsers = this.getFilteredUsers.bind(this);
    this.getUsersOnOffset = this.getUsersOnOffset.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
  }

  handleKeywordChange(keyword) {
    this.setState({ keyword, offset: 0 });
    if (keyword) {
      this.props.router.setSearchParams({ keyword });
    } else {
      this.props.router.setSearchParams({ });
    }
  }

  getFilteredUsers() {
    return this.props.users.filter(u => u.name.first.toLowerCase().includes(this.state.keyword.toLowerCase()));
  }

  getUsersOnOffset(offset, size) {
    return this.getFilteredUsers().slice(offset, offset + size);
  }

  handleChangePage(newOffset) {
    this.setState({ offset: newOffset });
    this.props.router.setSearchParams({ keyword: this.state.keyword, offset: newOffset });
  }

  render() {
    let section;
    const pageSize = 5;

    switch (this.props.status) {
      case 'ready':
        section = <div className='ready'>
          <SearchBar
            keyword={this.state.keyword}
            keywordHandler={this.handleKeywordChange}
          />
          <div className='cards-place'>
            {
              this.getUsersOnOffset(this.state.offset, pageSize).map((u,idx) => 
                <UserCard key={idx + u.name.first} user={u} idx={idx} />)
            }
          </div>
          <div className='pagin-place'>
            <button
              data-testid='prev-button'
              className='prev page'
              disabled={this.state.offset === 0} 
              onClick={() => this.handleChangePage(this.state.offset - pageSize)}>
              <i className="fas fa-chevron-left" />
              <span>Previous Page</span>
            </button>
            <button
              data-testid='next-button'
              className='next page'
              disabled={this.state.offset + pageSize >= this.getFilteredUsers().length }
              onClick={() => this.handleChangePage(this.state.offset + pageSize)}>
              <span>Next Page</span>
              <i className="fas fa-chevron-right" />
            </button>
          </div>
        </div>;
        break;
      case 'error':
        section = <div className='error'>
          <span>Gagal memuat data. Silakan muat ulang halaman.</span>
        </div>
        break;
      default:
        section = <div className='loading'>
          <span>Memuat Data...</span>
        </div>
    }
    return <div className='users-display-main'>
      {section}
    </div>;
  };
}

function UserDisplayWrapper(Component) {
  function UserDisplayWithRoute(props) {
    let [searchParams, setSearchParams] = useSearchParams();
    return (
      <Component 
        {...props}
        router={{ searchParams, setSearchParams }}
      />
    );
  }

  return UserDisplayWithRoute;
}

const propsMatcher = state => ({ users: state.users.users, status: state.users.status });
export default UserDisplayWrapper(connect(propsMatcher)(UsersDisplay));
