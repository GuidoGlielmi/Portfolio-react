import './App.css';
import NavBar from './components/nav-bar/NavBar';
import React, { useEffect, useState } from 'react';
import Header from 'components/header/Header';
import TechsAndInfo from 'components/techs-and-info/TechsAndInfo';
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
        education,
        experiences,
        projects,
        techs,
        skills,
        loggedIn,
        userLoading,
        educationLoading,
        experiencesLoading,
        projectsLoading,
        techsLoading,
        skillsLoading,
      }}
    >
      <NavBar />
      <Header />
      <TechsAndInfo />
    </InfoContext.Provider>
  );
};

export default App;
