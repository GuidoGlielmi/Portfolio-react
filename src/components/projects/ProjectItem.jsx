import {useContext, useEffect, useState} from 'react';
import {loginContext} from 'components/contexts/login/LoginContext';
import {userFeedbackContext} from 'components/contexts/user-feedback/UserFeedbackContext';
import CloseAndEdit from 'components/close-icon/CloseAndEdit';
import ProjectForm from 'components/forms/projects/ProjectForm';
import styles from './ProjectItem.module.css';

export default function ProjectItem({
  project,
  project: {id, techs: projectTechs, urls, title, description, projectImg},
  setProjects,
}) {
  const {makeRequest} = useContext(userFeedbackContext);
  const {loggedIn} = useContext(loginContext);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => !loggedIn && setShowForm(false), [loggedIn]);

  async function deleteProject() {
    try {
      await makeRequest({url: `projects/${id}`, method: 'delete'}, 'Project deleted');
      setProjects(pp => pp.filter(p => p.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  async function updateProject(newProject) {
    try {
      await makeRequest({url: 'projects', body: newProject, method: 'put'}, 'Project updated');
      console.log(newProject);
      setProjects(pe => pe.map(e => (e.id === project.id ? newProject : e)));
      setShowForm(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div>
        {loggedIn && (
          <CloseAndEdit toggleEdit={() => setShowForm(ps => !ps)} deleteItem={deleteProject} />
        )}
        <div className={styles.projectImgContainer}>
          <img src={projectImg} alt={`${title} logo`} />
        </div>
        {showForm ? (
          <ProjectForm project={project} handleSubmit={updateProject} setProjects={setProjects} />
        ) : (
          <div className={styles.projectInfoContainer}>
            <h3 /* className={styles.projectTitle} */>{title}</h3>
            <p /* className={styles.projectDescription} */>{description}</p>
            <div className={styles.urls}>
              {urls.map(u => (
                <a
                  /* className={styles.url} */ href={u.url}
                  target='_blank'
                  rel='noreferrer'
                  key={u.id}
                >
                  {u.name}
                </a>
              ))}
            </div>
            <div className={styles.techs}>
              {projectTechs.map((t, i) =>
                i !== projectTechs.length - 1 ? (
                  <span /* className={styles.tech} */ key={t.id}>{t.name} - </span>
                ) : (
                  <span /* className={styles.tech} */ key={t.id}>{t.name}</span>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
