import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import store from '../../store';
import SideNav from '.';
import { toggleSidebar } from '../../features/sidebar'

const wrapWithStore = () => {
  return <Provider store={store}><SideNav /></Provider>
}

describe('Component:SideNav', () => {
  it('Should match snapshot', () => {
    const { container } = render(wrapWithStore());
    expect(container).toMatchSnapshot();
    expect(screen.getByTestId('sidenav').classList).not.toContain('active');
  });

  it('should add active class on state change to sidebar active', () => {
    render(wrapWithStore());
    store.dispatch(toggleSidebar());
    expect(screen.getByTestId('sidenav').classList).toContain('active');
  });
});
