import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { assignUsers, setError, setLoading, setReady } from '../../features/users'
import { useSearchParams } from 'react-router-dom';

import store from '../../store';

import UsersDisplay from '.';


const wrapped = () => (
  <Provider store={store}>
    <BrowserRouter>
      <UsersDisplay />
    </BrowserRouter>
  </Provider>
);

const dummyUser = {
  name: {
    first: 'Taufik',
    last: 'Akbar',
  },
  cell: '082129136223',
  email: 'taufik.akbar7@gmail.com',
  dob: {
    date: '1994-05-17',
  },
  picture: {
    medium: 'https://some.picture.url',
  },
};

describe('Component:UserDisplay', () => {
  it('Should render and match snapshot: empty users', () => {
    const { container } = render(wrapped());
    expect(container).toMatchSnapshot();
  });

  it('Should render and match snapshot: loading', () => {
    const { container } = render(wrapped());
    store.dispatch(setLoading());
    expect(container).toMatchSnapshot();
  });

  it('Should render and match snapshot: load error', () => {
    const { container } = render(wrapped());
    store.dispatch(setError());
    expect(container).toMatchSnapshot();
  });

  it('Should render properly: 4 users', () => {
    render(wrapped());
    store.dispatch(assignUsers(
      Array(4)
        .fill(dummyUser)
    ));
    store.dispatch(setReady());
    const cards = screen.getAllByTestId('user-card');
    expect(cards.length).toBe(4);
    expect(screen.getByTestId('prev-button').disabled).toBe(true);
    expect(screen.getByTestId('next-button').disabled).toBe(true);
  });

  it('Should render properly: 10 users', () => {
    render(wrapped());
    store.dispatch(assignUsers(
      Array(10)
        .fill(dummyUser)
    ));
    store.dispatch(setReady());
    const cards = screen.getAllByTestId('user-card');
    expect(cards.length).toBe(5);
    expect(screen.getByTestId('prev-button').disabled).toBe(true);
    expect(screen.getByTestId('next-button').disabled).toBe(false);
  });

  it('Should let user go next page and set offset on url search query', () => {
    render(wrapped());
    store.dispatch(assignUsers(
      Array(7)
        .fill(dummyUser)
    ));
    store.dispatch(setReady());
    const prevPage = screen.getByTestId('prev-button');
    const nextPage = screen.getByTestId('next-button');
    fireEvent.click(nextPage);

    // 7 items so show 2 on page 2
    const cards = screen.getAllByTestId('user-card');
    expect(cards.length).toBe(2);
    expect(prevPage.disabled).toBe(false);
    expect(nextPage.disabled).toBe(true);
    expect(window.location.search).toContain('offset=5');
  });

  it('Should set keyword url search query on search', () => {
    render(wrapped());
    store.dispatch(assignUsers(
      Array(7)
        .fill(dummyUser)
    ));
    store.dispatch(setReady());
    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'search keyword' } });
    expect(window.location.search).toContain('keyword=search+keyword');
  });

  it('Should let user delete keyword and then remove query from url', () => {
    store.dispatch(assignUsers(
      Array(7)
        .fill(dummyUser)
    ));
    store.dispatch(setReady());
    render(wrapped());
    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(window.location.search).toContain('keyword=test');
    fireEvent.change(input, { target: { value: '' } });
    expect(window.location.search).not.toContain('keyword');
  });

  it('Should let user go next page and back to previous page', () => {
    render(wrapped());
    store.dispatch(assignUsers(
      Array(7)
        .fill(dummyUser)
    ));
    store.dispatch(setReady());
    const prevPage = screen.getByTestId('prev-button');
    const nextPage = screen.getByTestId('next-button');
    // go to page 2
    fireEvent.click(nextPage);
    // go back to page 1
    fireEvent.click(prevPage);

    const cards = screen.getAllByTestId('user-card');
    expect(cards.length).toBe(5);
    expect(prevPage.disabled).toBe(true);
    expect(nextPage.disabled).toBe(false);
    expect(window.location.search).toContain('offset=0');
  });

  it('Should get component state from url search query on load', () => {
    Object.defineProperty(window, 'location', {
      value: {
        search: '?keyword=taufik&offset=5',
      },
    });
    store.dispatch(assignUsers(
      Array(7)
        .fill(dummyUser)
    ));
    store.dispatch(setReady());
    render(wrapped());
    const input = screen.getByTestId('search-input');
    const prevPage = screen.getByTestId('prev-button');
    const nextPage = screen.getByTestId('next-button');
    expect(input.value).toBe('taufik');
    expect(prevPage.disabled).toBe(false);
    expect(nextPage.disabled).toBe(true);
  });
});
