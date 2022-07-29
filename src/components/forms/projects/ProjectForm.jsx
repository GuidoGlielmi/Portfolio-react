import {InfoContext} from 'App';
import Button from 'components/button/Button';
import CloseIcon from 'components/close-icon/CloseIcon';
import React, {useContext, useEffect, useRef, useState} from 'react';
import fetch from 'services/fetch';
import styles from './ProjectForm.module.css';
const initialState = {title: '', description: '', projectImg: '', techs: [], urls: []};
export default function ProjectForm({
  project = initialState,
  handleSubmit,
  setProjects,
  // i,
  // hideForm,
}) {
  const title = useRef(project.title);
  const description = useRef(project.description);
  const projectImg = useRef(project.projectImg);

  async function onSubmit(event) {
    event.preventDefault();
    await handleSubmit({
      ...project,
      title: title.current.value,
      description: description.current.value,
      projectImg: projectImg.current.value,
    });
    title.current.value = '';
    description.current.value = '';
    projectImg.current.value = '';
    /* const newProject = {
      ...p,
      title: title.current.value,
      description: description.current.value,
      projectImg: projectImg.current.value,
    };
    if (!!p.id) {
      await adminApi.put('/projects', newProject);
      projects[i] = newProject;
      hideForm();
    } else {
      const generatedId = await adminApi.post('/projects', newProject);
      newProject.id = generatedId;
      projects.push(newProject);
      projects.sort((a, b) => a.title > b.title);
      title.current.value = '';
      description.current.value = '';
      projectImg.current.value = '';
    }
    setProjects([...projects]); */
  }

  return (
    <form onSubmit={onSubmit} className={styles.projectForm}>
      <div className={styles.projectInputs}>
        <div className={styles.singleElements}>
          <div className={styles.inputLabel}>
            <label className={styles.projectLabel} htmlFor='title'>
              Title
            </label>
            <input
              defaultValue={project.title}
              className={styles.projectInput}
              ref={title}
              name='title'
              id='title'
            />
          </div>
          <div className={styles.inputLabel}>
            <label className={styles.projectLabel} htmlFor='description'>
              Description
            </label>
            <input
              defaultValue={project.description}
              className={styles.projectInput}
              ref={description}
              name='description'
              id='description'
            />
          </div>
          <div className={styles.inputLabel}>
            <label className={styles.projectLabel} htmlFor='projectImg'>
              Project image path
            </label>
            <input
              defaultValue={project.projectImg}
              className={styles.projectInput}
              ref={projectImg}
              name='projectImg'
              id='projectImg'
            />
          </div>
        </div>
        <ProjectUrls project={project} setProjects={setProjects} />
        <ProjectTechs project={project} setProjects={setProjects} />
      </div>
      <div>
        <Button>Save</Button>
      </div>
    </form>
  );
}

function ProjectUrls({project: {urls: projectUrls, id: projectId}, setProjects}) {
  const [showNewUrl, setShowNewUrl] = useState(false);

  async function addUrl(newUrl) {
    const addedUrlId = await fetch.post('projects/url', newUrl);
    newUrl.id = addedUrlId;
    setProjects(pp =>
      pp
        .map(p => (p.id === projectId ? {...p, urls: [...p.urls, newUrl]} : p))
        .sort((a, b) => a.name > b.name),
    );
    setShowNewUrl(false);
  }

  return (
    <div className={styles.urlsSection}>
      <p className={styles.projectLabel}>Urls</p>
      <div className={styles.urlsContainer}>
        {projectUrls.map(u => (
          <ProjectUrlUpdateForm
            key={u.id}
            projectId={projectId}
            projectUrl={u}
            setProjects={setProjects}
          />
        ))}
      </div>
      {showNewUrl && <ProjectUrlAddForm addUrl={addUrl} />}
      <div
        className={styles.toggleAddUrlButton}
        onClick={e => {
          e.preventDefault();
          setShowNewUrl(ps => !ps);
        }}
      >
        <Button>Add url</Button>
      </div>
    </div>
  );
}

function ProjectUrlUpdateForm({projectId, projectUrl, setProjects}) {
  const [url, setUrl] = useState(projectUrl.url);
  const [name, setName] = useState(projectUrl.name);

  useEffect(() => {
    const updatedUrl = {...projectUrl, url, name};
    setProjects(pp =>
      pp.map(p =>
        p.id === updatedUrl.projectId
          ? {
              ...p,
              urls: p.urls
                .map(u => (u.id === updatedUrl.id ? updatedUrl : u))
                .sort((a, b) => a.name > b.name),
            }
          : p,
      ),
    );
  }, [url, name, projectUrl, projectId, setProjects]);

  async function removeUrl(urlId) {
    await fetch.delete(`projects/url/${urlId}`);
    setProjects(pp =>
      pp
        .map(p => (p.id === projectId ? {...p, urls: p.urls.filter(u => u.id !== urlId)} : p))
        .sort((a, b) => a.name > b.name),
    );
  }

  return (
    <div className={styles.urlItem}>
      <ProjectUrlForm url={url} setUrl={setUrl} urlName={name} setUrlName={setName} />
      <div className={styles.deleteButton} onClick={removeUrl}>
        <CloseIcon size='20px' />
      </div>
    </div>
  );
}
function ProjectUrlAddForm({addUrl}) {
  const [url, setUrl] = useState('');
  const [urlName, setUrlName] = useState('');
  const handleAddUrl = async () => {
    await addUrl({url, name: urlName});
    setUrl('');
    setUrlName('');
  };
  return (
    <ProjectUrlForm url={url} setUrl={setUrl} urlName={urlName} setUrlName={setUrlName}>
      <div onClick={handleAddUrl} className={styles.addButton}>
        <CloseIcon size='20px' />
      </div>
    </ProjectUrlForm>
  );
}

function ProjectUrlForm({id = '', url = '', setUrl, urlName = '', setUrlName, children}) {
  return (
    <div className={styles.urlContainer}>
      <div className={styles.urlInputContainer}>
        <label className={styles.urlLabel} htmlFor={id || 'name'}>
          Name
        </label>
        <input
          value={urlName}
          className={styles.urlInput}
          id={id || 'name'}
          onChange={e => setUrlName(e.target.value)}
        />
      </div>
      <div className={styles.urlInputContainer}>
        <label className={styles.urlLabel} htmlFor={id || 'url'}>
          Url
        </label>
        <input
          value={url}
          className={styles.urlInput}
          id={id || 'url'}
          onChange={e => setUrl(e.target.value)}
        />
      </div>
      {children}
    </div>
  );
}

function ProjectTechs({project: {id: projectId, techs: projectTechs}, setProjects}) {
  const {techs} = useContext(InfoContext);
  const remainingTechs = techs.filter(t => !projectTechs.find(({id}) => t.id === id));

  async function addTech(index) {
    const newTech = remainingTechs[index];
    await fetch.post('projects/url', newTech);
    setProjects(pp =>
      pp.map(p =>
        p.id === projectId
          ? {...p, techs: [...p.techs, newTech].sort((a, b) => a.name > b.name)}
          : p,
      ),
    );
  }
  async function removeTech(techId) {
    await fetch.delete(`projects/${projectId}/tech/${techId}`);
    setProjects(pp =>
      pp.map(p =>
        p.id === projectId
          ? {...p, techs: p.techs.filter(t => t.id !== techId).sort((a, b) => a.name > b.name)}
          : p,
      ),
    );
  }

  return (
    <div className={styles.techsSection}>
      <p className={styles.projectLabel}>Techs</p>
      {projectTechs.map(t => (
        <ProjectTech key={t.id} projectTech={t} removeTech={removeTech} />
      ))}
      <select>
        <option value='' disabled selected>
          Add a tech
        </option>
        {remainingTechs.map((rt, i) => (
          <option onClick={() => addTech(i)} key={rt.id} value={rt.id}>
            {rt.name}
          </option>
        ))}
      </select>
    </div>
  );
}
function ProjectTech({tech: {id, name}, removeTech}) {
  const handleRemoveTech = () => removeTech(id);
  return (
    <div key={id} className={styles.techContainer}>
      <span>{name}</span>
      <div onClick={handleRemoveTech}>
        <CloseIcon size='20px' />
      </div>
    </div>
  );
}

/* function debounce(fn, delay) {
  let timer;
  let active = false;
  return () => {
    if (active) clearTimeout(timer);
    timer = setTimeout(() => {
      active = false;
      fn();
    }, delay);
    active = true;
  };
} */
