import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import flushPromises from 'flush-promises';
import axios from 'axios';
import store from './store';
import App from './App';
import { assignUsers } from './features/users'

jest.mock('./components/UsersDisplay', () => (
  function UserDisplay() {
    // user display is rather complex so better test in the file
    return <div>User-Display-Mock</div>;
  }
));
jest.mock('axios', () => ({
  get: jest.fn(),
}));

const wrapped = () => <Provider store={store}><App /></Provider>;

const dummyResults = [
  {
    name: { first: 'Taufik', last: 'Akbar' },
  },
];

describe('Main Component: App', () => {
  afterEach(() => {
    axios.get.mockClear();
    store.dispatch(assignUsers([]));
    window.sessionStorage.removeItem('shprUsers');
  });

  it('Should render and match snapshot', () => {
    axios.get.mockResolvedValue({
      data: {
        results: dummyResults,
      },
    });
    const { container } = render(wrapped());
    expect(container).toMatchSnapshot();
  });

  it('Should call API to randomuser site', () => {
    axios.get.mockResolvedValue({
      data: {
        results: dummyResults,
      },
    });
    render(wrapped());
    expect(axios.get).toHaveBeenLastCalledWith('https://randomuser.me/api/?results=30');
  });

  it('Should use from session storage if exists', () => {
    axios.get.mockResolvedValue({
      data: {
        results: dummyResults,
      },
    });
    window.sessionStorage.setItem('shprUsers', JSON.stringify(dummyResults));
    render(wrapped());
    expect(axios.get).not.toHaveBeenCalledWith('https://randomuser.me/api/?results=30');
  });

  it('Should use from redux store if already exists', () => {
    axios.get.mockResolvedValue({
      data: {
        results: dummyResults,
      },
    });
    store.dispatch(assignUsers(dummyResults));
    render(wrapped());
    expect(axios.get).not.toHaveBeenCalledWith('https://randomuser.me/api/?results=30');
  });

  it('Should handle api failed', async () => {
    axios.get.mockRejectedValueOnce({});
    render(wrapped());
    await flushPromises();
    expect(store.getState().users.status).toBe('error');
  });

});
