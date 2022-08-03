import {useContext} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {loginContext} from 'components/contexts/login/LoginContext';
import Login from 'views/Login';
import Admin from 'views/Admin';

const App = () => {
  const {loggedIn} = useContext(loginContext);
  return (
    <Routes>
      <Route path='/' element={<Admin />} />
      <Route path='/login' element={!loggedIn ? <Login /> : <Navigate to='/' />} />
      <Route path='*' element={<Navigate to='login' />} />
    </Routes>
  );
};

export default App;
