import React, {useContext, useEffect, useState} from 'react';
import {InfoContext} from 'App';
import styles from './Projects.module.css';
import ProjectItem from './ProjectItem';
import ProjectForm from 'components/forms/projects/ProjectForm';
import Button from 'components/button/Button';
import LoadingIcon from 'components/loading-icon/LoadingIcon';
import useFetch from 'components/custom-hooks/useFetch';
export default function Projects() {
  const [loading, projects, setProjects] = useFetch({url: '/education'});
  const {loggedIn} = useContext(InfoContext);

  const [showNewForm, setShowNewForm] = useState(false);

  useEffect(() => !loggedIn && setShowNewForm(false), [loggedIn]);
  const toggleNewForm = () => setShowNewForm(ps => !ps);

  async function addProject(newProject) {
    const addedProjectId = await fetch.post('projects', newProject);
    newProject.id = addedProjectId;
    setProjects([...projects, newProject].sort((a, b) => a.title > b.title));
    setShowNewForm(false);
  }

  return (
    <section className={styles.projectsSection}>
      <div className={styles.titleContainer}>
        <p className={`${styles.title} textShadowLight`}>Projects i've worked on</p>
      </div>
      <div className={styles.projects}>
        {loading ||
          projects.map((p, i) => (
            <ProjectItem p={p} i={i} key={p.id} setEducations={setProjects} />
          ))}
      </div>
      {showNewForm && <ProjectForm handleSubmit={addProject} />}
      {loggedIn && (
        <div onClick={toggleNewForm} className={styles.addButton}>
          <Button>Add project</Button>
        </div>
      )}
    </section>
  );
}
