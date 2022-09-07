import {useContext, useEffect, useState} from 'react';
import {loginContext} from 'components/contexts/login/LoginContext';
import {userFeedbackContext} from 'components/contexts/user-feedback/UserFeedbackContext';
import {userContext} from 'components/contexts/user/UserContext';
import ProjectForm from 'components/forms/projects/ProjectForm';
import Button from 'components/button/Button';
import ProjectItem from './ProjectItem';
import styles from './Projects.module.css';

export default function Projects() {
  const {makeRequest} = useContext(userFeedbackContext);
  const {loggedIn} = useContext(loginContext);
  const {loadingProjects: loading, projects, setProjects} = useContext(userContext);

  const [showNewForm, setShowNewForm] = useState(false);

  useEffect(() => !loggedIn && setShowNewForm(false), [loggedIn]);
  const toggleNewForm = () => setShowNewForm(ps => !ps);

  async function addProject(newProject) {
    try {
      const addedProjectId = await makeRequest(
        {url: 'projects', body: newProject, method: 'post'},
        'Project added successfully',
      );
      newProject.id = addedProjectId;
      setProjects(pp => [...pp, newProject]);
      setShowNewForm(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className={styles.projectsSection}>
      <h2>Projects I&apos;ve worked on</h2>
      <div className={styles.projects}>
        {loading || projects.map(p => <ProjectItem project={p} key={p.id} setProjects={setProjects} />)}
      </div>
      {showNewForm && <ProjectForm handleSubmit={addProject} setProjects={setProjects} />}
      {loggedIn && (
        <div onClick={toggleNewForm} className={styles.addButton}>
          <Button>Add project</Button>
        </div>
      )}
    </section>
  );
}
