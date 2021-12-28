import './App.css';

import Navbar from './components/Navbar';

function App() {
  const user = {
    name: 'Shipper User',
  };

  return (
    <Navbar user={user}/>
  );
}

export default App;
