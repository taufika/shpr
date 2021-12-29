import { useDispatch } from 'react-redux'
import { assignUsers, setError, setLoading, setReady } from './features/users'
import axios from 'axios';

import './App.css';

import Navbar from './components/Navbar';
import SideNav from './components/SideNav';
import UsersDisplay from './components/UsersDisplay';


function App() {
  const dispatch = useDispatch();

  const getUsersThunk = async (dispatch, getState) => {
    if (getState().users.users.length) return;
    dispatch(setLoading());

    // check from local storage
    const userFromStorage = window.sessionStorage.getItem('shprUsers');
    if (userFromStorage) {
      dispatch(assignUsers(JSON.parse(userFromStorage)));
      dispatch(setReady());
      return;
    }

    // get from API
    try {
      const apiResult = await axios.get('https://randomuser.me/api/?results=30');
      window.sessionStorage.setItem('shprUsers', JSON.stringify(apiResult.data.results));
      dispatch(assignUsers(apiResult.data.results));
      dispatch(setReady());
    } catch (_) {
      dispatch(setError());
    }
  }
  dispatch(getUsersThunk);

  const user = {
    name: 'Shipper User',
  };

  return (
    <main className='app'>
      <Navbar user={user}/>
      <section className='main-container'>
        <SideNav />
        <UsersDisplay />
      </section>
    </main>
  );
}

export default App;
