import {useContext, useEffect, useState} from 'react';
import {userContext} from 'components/contexts/user/UserContext';
import CloseAndEdit from 'components/close-icon/CloseAndEdit';
import ProjectForm from 'components/forms/projects/ProjectForm';
import styles from './ProjectItem.module.css';

export default function ProjectItem({
  project,
  project: {id, techs: projectTechs, urls, title, description, projectImg},
  setProjects,
}) {
  const {loggedIn, makeRequest} = useContext(userContext);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => !loggedIn && setShowForm(false), [loggedIn]);

  async function deleteProject() {
    await makeRequest({url: `project/${id}`, method: 'delete'});
    setProjects(pp => pp.filter(p => p.id !== id));
  }

  async function updateProject(newProject) {
    await makeRequest({url: 'project', body: newProject, method: 'put'});
    setProjects(pe => pe.map(e => (e.id === project.id ? newProject : e)));
    setShowForm(false);
  }

  return (
    <div
    /*  className={`${styles.projectContainer} ${
        i % 2 === 0 ? styles.projectContainerRight : styles.projectContainerLeft
      }`} */
    >
      <div /* className={i % 2 === 0 ? styles.projectRight : styles.projectLeft} */>
        {loggedIn && (
          <CloseAndEdit toggleEdit={() => setShowForm(ps => !ps)} deleteItem={deleteProject} />
        )}
        <div className={styles.projectImgContainer}>
          <img className={styles.projectImg} src={projectImg} alt={`${title} logo`} />
        </div>
        {showForm ? (
          <ProjectForm project={project} handleSubmit={updateProject} />
        ) : (
          <div className={styles.projectInfoContainer}>
            <h3 className={styles.projectTitle}>{title}</h3>
            <p className={styles.projectDescription}>{description}</p>
            <div className={styles.urls}>
              {urls.map(u => (
                <a className={styles.url} href={u.url} target='_blank' rel='noreferrer' key={u.id}>
                  {u.name}
                </a>
              ))}
            </div>
            <div className={styles.techs}>
              {projectTechs.map((t, i) =>
                i !== projectTechs.length - 1 ? (
                  <span className={styles.tech} key={t.id}>
                    {t.name} -{' '}
                  </span>
                ) : (
                  <span className={styles.tech} key={t.id}>
                    {t.name}
                  </span>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
