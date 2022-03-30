import './App.css';
import NavBar from './components/nav-bar/NavBar';
import React, { useEffect, useState } from 'react';
export const InfoContext = React.createContext();
const App = () => {
  const [user, setUser] = useState({});
  const [education, setEducation] = useState({});
  const [experiences, setExperiences] = useState({});
  const [projects, setProjects] = useState({});
  const [skills, setSkills] = useState({});
  const [techs, setTechs] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => getInfo(), []);
  async function getInfo() {
    const rawUser = await fetch('http://localhost:8080/users');
    const user = await rawUser.json();
    setUser(user);
    const rawEducation = await fetch('http://localhost:8080/education');
    const education = await rawEducation.json();
    setEducation(education);
    const rawExperiences = await fetch('http://localhost:8080/experiences');
    const experiences = await rawExperiences.json();
    setExperiences(experiences);
    const rawProjects = await fetch('http://localhost:8080/projects');
    const projects = await rawProjects.json();
    setProjects(projects);
    const rawTechs = await fetch('http://localhost:8080/techs');
    const techs = await rawTechs.json();
    setTechs(techs);
    const rawSkills = await fetch('http://localhost:8080/skills');
    const skills = await rawSkills.json();
    setSkills(skills);
  }
  return (
    <InfoContext.Provider
      value={{ user, education, experiences, projects, techs, skills, loggedIn }}
    >
      <NavBar />
    </InfoContext.Provider>
  );
};

export default App;
