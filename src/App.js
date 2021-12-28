import { useSelector, useDispatch } from 'react-redux'
import { assignUsers, setError, setLoading, setReady } from './features/users'
import axios from 'axios';

import './App.css';

import Navbar from './components/Navbar';
import SideNav from './components/SideNav';


function App() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  const getUsersThunk = async (dispatch, getState) => {
    if (getState().users.length) return;
    dispatch(setLoading());
    try {
      const apiResult = await axios.get('https://randomuser.me/api/?results=30');
      dispatch(assignUsers(apiResult.data));
      dispatch(setReady());
    } catch (e) {
      console.error(e);
      dispatch(setError());
    }
    console.log(getState().users);
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
      </section>
    </main>
  );
}

export default App;
