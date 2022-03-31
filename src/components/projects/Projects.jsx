import React, { useContext } from 'react';
import { InfoContext } from 'App';
import styles from './Projects.module.css';
import ProjectItem from './ProjectItem';
export default function Projects() {
  const projects = useContext(InfoContext).projects;
  const loggedIn = useContext(InfoContext).loggedIn;
  const loading = 'loading...';
  return (
    <section className={styles.projectsSection}>
      <div className={styles.titleContainer}>
        <p className={styles.title}>Projects i've worked on</p>
      </div>
      <div className={styles.projects}>
        {projects ? projects.map((p, i) => <ProjectItem p={p} i={i} />) : loading}
      </div>
    </section>
  );
}
