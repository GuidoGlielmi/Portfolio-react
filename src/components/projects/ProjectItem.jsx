import { InfoContext } from 'App';
import CloseAndEdit from 'components/close-icon/CloseAndEdit';
import ProjectForm from 'components/forms/projects/ProjectForm';
import { adminApi } from 'index';
import React, { useContext, useState } from 'react';
import styles from './ProjectItem.module.css';
export default function ProjectItem({ p, i }) {
  const [showForm, setShowForm] = useState(false);
  const loggedIn = useContext(InfoContext).loggedIn;
  const projects = useContext(InfoContext).projects;
  const setProject = useContext(InfoContext).setProject;
  async function deleteProject() {
    await adminApi.delete(`/projects/${p.id}`);
    projects.splice(i, 1);
    const newProject = [...projects];
    setProject(newProject);
  }
  return (
    <div
      className={`${styles.projectContainer} ${
        i % 2 === 0 ? styles.projectContainerRight : styles.projectContainerLeft
      }`}
    >
      <div className={i % 2 === 0 ? styles.projectRight : styles.projectLeft}>
        {loggedIn && (
          <CloseAndEdit toggleEdit={() => setShowForm(!showForm)} deleteItem={deleteProject} />
        )}
        <div className={styles.projectImgContainer}>
          <img className={styles.projectImg} src={p.projectImg} alt={`${p.title} logo`} />
        </div>
        {!showForm ? (
          <div className={styles.projectInfoContainer}>
            <h3 className={styles.projectTitle}>{p.title}</h3>
            <p className={styles.projectDescription}>{p.description}</p>
            <div className={styles.urls}>
              {p.urls.map((u) => (
                <a className={styles.url} href={u.url} target='_blank' rel='noreferrer' key={u.id}>
                  {u.name}
                </a>
              ))}
            </div>
            <div className={styles.techs}>
              {p.techs.map((t, i) => {
                return i !== p.techs.length - 1 ? (
                  <span className={styles.tech} key={t.id}>
                    {t.name} -
                  </span>
                ) : (
                  <span className={styles.tech} key={t.id}>
                    {t.name}
                  </span>
                );
              })}
            </div>
          </div>
        ) : (
          <ProjectForm p={p} i={i} hideForm={() => setShowForm(!showForm)} />
        )}
      </div>
    </div>
  );
}
