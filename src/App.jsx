import {Navigate, Route, Routes} from 'react-router-dom';
import Login from 'components/routes/Login';
import Admin from 'components/routes/Admin';

const App = () => (
  <Routes>
    <Route path='guest' element={<Admin />} />
    <Route path='login' element={<Login />} />
    <Route path='*' element={<Navigate to='login' />} />
  </Routes>
);

export default App;
