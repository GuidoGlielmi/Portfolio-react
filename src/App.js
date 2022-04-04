import React, { useEffect, useState } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';
import Login from 'components/routes/Login';
import Admin from 'components/routes/Admin';
import { userApi } from 'index';
export const InfoContext = React.createContext();
const App = () => {
  let token = sessionStorage.getItem('accessToken');
  const [users, setUsers] = useState('');
  const [education, setEducation] = useState('');
  const [experiences, setExperiences] = useState('');
  const [projects, setProjects] = useState('');
  const [skills, setSkills] = useState('');
  const [techs, setTechs] = useState('');
  const [loggedIn, setLoggedIn] = useState(token);

  useEffect(() => getInfo(), []);
  async function getInfo() {
    // the idea is not to stop code if error==true
    const users = await userApi.get('/users');
    if (users) {
      setUsers(users.data);
    }

    const education = await userApi.get('/education');
    if (education) {
      setEducation(education.data);
    }

    const experiences = await userApi.get('/experiences');
    if (experiences) {
      setExperiences(experiences.data);
    }

    const projects = await userApi.get('/projects');
    if (projects) {
      setProjects(projects.data);
    }

    const techs = await userApi.get('/techs');
    if (techs) {
      setTechs(techs.data);
    }

    const skills = await userApi.get('/skills');
    if (skills) {
      setSkills(skills.data);
    }
  }
  return (
    <InfoContext.Provider
      value={{
        users,
        setUsers,
        education,
        setEducation,
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
/* function RequireAuth(children) {
  // children -> ProtectedPage
  let globalContext = React.useContext(InfoContext);

  let location = useLocation();
  if (!globalContext.loggedIn) {
    // does context NOT contain a logged user?
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  return children;
} */
export default App;
