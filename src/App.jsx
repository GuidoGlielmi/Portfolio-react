import {Navigate, Route, Routes} from 'react-router-dom';
import Login from 'components/routes/Login';
import Admin from 'components/routes/Admin';
import {useContext} from 'react';
import {userContext} from 'components/contexts/user/UserContext';

const App = () => {
  const {loggedIn} = useContext(userContext);
  return (
    <Routes>
      <Route path='guest' element={<Admin />} />
      <Route path='login' element={loggedIn ? <Login /> : <Admin />} />
      <Route path='*' element={<Navigate to='login' />} />
    </Routes>
  );
};

export default App;
