import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store';
import Navbar from '.';

const user = {
  name: 'Shipper User',
};

const wrapped = () => (
  <Provider store={store}><Navbar user={user} /></Provider>
);

describe('Component:Navbar', () => {
  it('Should render and match snapshot', () => {
    const { container } = render(wrapped());
    expect(container).toMatchSnapshot();
  });

  it('Should let user change sidebar active state using hamburger menu', () => {
    render(wrapped());
    expect(store.getState().sidebar.isSidebarActive).toBe(false);
    const hamburger = screen.getByTestId('navbar-hamburger');
    fireEvent.click(hamburger);
    expect(store.getState().sidebar.isSidebarActive).toBe(true);
  });
});