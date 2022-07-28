import React, {useState} from 'react';

import {Navigate, Route, Routes} from 'react-router-dom';
import Login from 'components/routes/Login';
import Admin from 'components/routes/Admin';
import useFetch from 'components/custom-hooks/useFetch';
export const InfoContext = React.createContext();
// context is used to share state throughout the WHOLE app
const App = () => {
  let token = sessionStorage.getItem('accessToken');
  const [users, setUsers] = useFetch({url: '/users'});
  const [experiences, setExperiences] = useFetch({url: '/experiences'});
  const [projects, setProjects] = useFetch({url: '/projects'});
  const [skills, setSkills] = useFetch({url: '/skills'});
  const [techs, setTechs] = useFetch({url: '/techs'});
  const [loggedIn, setLoggedIn] = useState(token);
  const [globalLoading, setGlobalLoading] = useState(false);

  return (
    <InfoContext.Provider
      value={{
        users,
        setUsers,
        experiences,
        setExperiences,
        projects,
        setProjects,
        techs,
        setTechs,
        skills,
        setSkills,
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
