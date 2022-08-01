import {Navigate, Route, Routes} from 'react-router-dom';
import Login from 'views/Login';
import Admin from 'views/Admin';
import {useContext} from 'react';
import {userContext} from 'components/contexts/user/UserContext';

const App = () => {
  const {loggedIn} = useContext(userContext);
  return (
    <Routes>
      <Route path='/' element={<Admin />} />
      <Route path='/login' element={!loggedIn ? <Login /> : <Navigate to='/' />} />
      <Route path='*' element={<Navigate to='login' />} />
    </Routes>
  );
};

export default App;
