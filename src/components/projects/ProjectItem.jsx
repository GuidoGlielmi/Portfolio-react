import {useContext, useEffect, useState} from 'react';
import {loginContext} from 'components/contexts/login/LoginContext';
import {userFeedbackContext} from 'components/contexts/user-feedback/UserFeedbackContext';
import CloseAndEdit from 'components/close-icon/CloseAndEdit';
import ProjectForm from 'components/forms/projects/ProjectForm';
import styles from './ProjectItem.module.css';

export default function ProjectItem({
  project,
  project: {id, techs: projectTechs, urls, title, description, projectImg, deployUrl},
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
          <h3>{title}</h3>
          <p>{description}</p>
          {deployUrl && (
            <a href={deployUrl} target='_blank' rel='noreferrer'>
              {title} live app
            </a>
          )}
          <div className={styles.urls}>
            {urls.map(u => (
              <a href={u.url} target='_blank' rel='noreferrer' key={u.id}>
                {`${u.name} Repo`}
              </a>
            ))}
          </div>
          <div className={styles.techs}>
            {projectTechs.map((t, i) =>
              i !== projectTechs.length - 1 ? (
                <span key={t.id}>{t.name} - </span>
              ) : (
                <span key={t.id}>{t.name}</span>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
}
