import React, { useEffect, useState } from 'react';

import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Login from 'components/routes/Login';
import Admin from 'components/routes/Admin';
export const InfoContext = React.createContext();
const App = () => {
  const [user, setUser] = useState('');
  const [education, setEducation] = useState('');
  const [experiences, setExperiences] = useState('');
  const [projects, setProjects] = useState('');
  const [skills, setSkills] = useState('');
  const [techs, setTechs] = useState('');
  const [userLoading, setUserLoading] = useState(true);
  const [educationLoading, setEducationLoading] = useState(true);
  const [experiencesLoading, setExperiencesLoading] = useState(true);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [skillsLoading, setSkillsLoading] = useState(true);
  const [techsLoading, setTechsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => getInfo(), []);
  async function getInfo() {
    const rawUser = await fetch('http://localhost:8080/users');
    const user = await rawUser.json();
    setUser(user);
    setUserLoading(false);
    const rawEducation = await fetch('http://localhost:8080/education');
    const education = await rawEducation.json();
    setEducation(education);
    setEducationLoading(false);
    const rawExperiences = await fetch('http://localhost:8080/experiences');
    const experiences = await rawExperiences.json();
    setExperiences(experiences);
    setExperiencesLoading(false);
    const rawProjects = await fetch('http://localhost:8080/projects');
    const projects = await rawProjects.json();
    setProjects(projects);
    setProjectsLoading(false);
    const rawTechs = await fetch('http://localhost:8080/techs');
    const techs = await rawTechs.json();
    setTechs(techs);
    setTechsLoading(false);
    const rawSkills = await fetch('http://localhost:8080/skills');
    const skills = await rawSkills.json();
    setSkills(skills);
    setSkillsLoading(false);
  }
  return (
    <InfoContext.Provider
      value={{
        user,
        setUser,
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
        userLoading,
        educationLoading,
        experiencesLoading,
        projectsLoading,
        techsLoading,
        skillsLoading,
      }}
    >
      <Routes>
        <Route path='guest' element={<Admin />} />
        <Route path='login' element={<Login />} />
        <Route
          path='/'
          element={
            <RequireAuth>
              <Admin />
            </RequireAuth>
          }
        />
        <Route
          path='*'
          element={
            <main
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                height: '100vh',
              }}
            >
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
      {/* log in component to edit or to enter as a guest */}
    </InfoContext.Provider>
  );
};
function RequireAuth(children) {
  // children -> ProtectedPage
  let globalContext = React.useContext(InfoContext);

  let location = useLocation();
  if (!globalContext.loggedIn) {
    // does context NOT contain a logged user?
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  return children;
}
export default App;
async function save(url, item) {
  const token = sessionStorage.getItem('accessToken');
  const options = {
    headers: {
      Authorization: token,
    },
    method: 'PUT',
    body: item,
  };
  fetch(url, options);
}
