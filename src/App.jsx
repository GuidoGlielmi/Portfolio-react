import React, {useState} from 'react';

import {Navigate, Route, Routes} from 'react-router-dom';
import Login from 'components/routes/Login';
import Admin from 'components/routes/Admin';
import useFetch from 'components/custom-hooks/useFetch';
export const InfoContext = React.createContext();
const App = () => {
  const [loggedIn, setLoggedIn] = useState(!!sessionStorage.getItem('accessToken'));
  const [globalLoading, setGlobalLoading] = useState(false);
  const [loadingTechs, techs, setTechs] = useFetch({url: '/techs'});

  return (
    <InfoContext.Provider
      value={{
        techs,
        setTechs,
        loadingTechs,
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
