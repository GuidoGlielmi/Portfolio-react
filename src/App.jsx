import React, {useState} from 'react';

import {Navigate, Route, Routes} from 'react-router-dom';
import Login from 'components/routes/Login';
import Admin from 'components/routes/Admin';
export const InfoContext = React.createContext();
// context is used to share state throughout the WHOLE app
const App = () => {
  const [loggedIn, setLoggedIn] = useState(!!sessionStorage.getItem('accessToken'));
  const [globalLoading, setGlobalLoading] = useState(false);

  return (
    <InfoContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        globalLoading,
        setGlobalLoading,
      }}
    >
      <Routes>
        <Route path='guest' element={<Admin />} />
        <Route path='login' element={<Login />} />
        <Route path='*' element={<Navigate to='login' />} />
      </Routes>
    </InfoContext.Provider>
  );
};

export default App;
