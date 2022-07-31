import {userContext} from 'components/contexts/user/UserContext';
import Button from 'components/button/Button';
import CloseIcon from 'components/close-icon/CloseIcon';
import {useContext, useEffect, useRef, useState} from 'react';
import styles from './ProjectForm.module.css';

const initialState = {title: '', description: '', projectImg: '', techs: [], urls: []};
export default function ProjectForm({project = initialState, handleSubmit, setProjects}) {
  const title = useRef(project.title);
  const description = useRef(project.description);
  const projectImg = useRef(project.projectImg);

  function onSubmit(event) {
    event.preventDefault();
    handleSubmit({
      ...project,
      title: title.current.value,
      description: description.current.value,
      projectImg: projectImg.current.value,
    });
    /*     title.current.value = '';
    description.current.value = '';
    projectImg.current.value = ''; */
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

  return (
    <div className={styles.urlsSection}>
      <p className={styles.projectLabel}>Urls</p>
      <div className={styles.urlsContainer}>
        {projectUrls.map(u => (
          <ProjectUrlFormHandler key={u.id} projectUrl={u} setProjects={setProjects} />
        ))}
      </div>
      {showNewUrl && (
        <ProjectUrlFormHandler
          projectId={projectId}
          setProjects={setProjects}
          setShowNewUrl={setShowNewUrl}
        />
      )}
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

const initialUrl = {url: '', name: ''};
function ProjectUrlFormHandler({
  projectUrl = initialUrl,
  projectId = projectUrl.projectId,
  setProjects,
  setShowNewUrl,
}) {
  const [url, setUrl] = useState(projectUrl);
  const isAddForm = projectUrl === initialUrl;
  const {makeRequest} = useContext(userContext);
  useEffect(() => {
    (async () => {
      if (projectUrl === initialUrl) return;
      await makeRequest({
        url: 'projects/url',
        body: url,
        method: 'put',
      });
      setProjects(pp =>
        pp.map(p =>
          p.id === projectId
            ? {
                ...p,
                urls: p.urls.map(u => (u.id === url.id ? url : u)),
              }
            : p,
        ),
      );
    })();
  }, [url, makeRequest, setProjects, projectUrl, projectId]);

  async function addUrl() {
    const newUrl = {...url, projectId};
    const addedUrlId = await makeRequest({url: 'projects/url', body: newUrl, method: 'post'});
    newUrl.id = addedUrlId;
    setProjects(pp => pp.map(p => (p.id === projectId ? {...p, urls: [...p.urls, newUrl]} : p)));
    setShowNewUrl(false);
  }

  async function removeUrl() {
    const {id} = projectUrl;
    await makeRequest({url: `projects/url/${id}`, method: 'delete'});
    setProjects(pp =>
      pp.map(p => (p.id === projectId ? {...p, urls: p.urls.filter(u => u.id !== id)} : p)),
    );
  }

  return (
    <div className={styles.urlItem}>
      <ProjectUrlForm setUrl={setUrl}>
        {isAddForm && (
          <div onClick={addUrl} className={styles.addButton}>
            <CloseIcon size='20px' />
          </div>
        )}
      </ProjectUrlForm>
      {!isAddForm && (
        <div className={styles.deleteButton} onClick={removeUrl}>
          <CloseIcon size='20px' />
        </div>
      )}
    </div>
  );
}

function ProjectUrlForm({setUrl, children, projectUrl = initialUrl}) {
  const url = useRef(projectUrl.url);
  const name = useRef(projectUrl.name);
  const props = Object.freeze({
    [projectUrl === initialUrl ? 'onChange' : 'onBlur']: () =>
      setUrl(ps => ({
        ...ps,
        url: url.current.value,
        name: name.current.value,
      })),
  });
  return (
    <div className={styles.urlContainer}>
      <div className={styles.urlInputContainer}>
        <label className={styles.urlLabel} htmlFor={projectUrl.id || 'name'}>
          Name
        </label>
        <input
          defaultValue={name.current}
          ref={name}
          className={styles.urlInput}
          id={projectUrl.id || 'name'}
          {...props}
        />
      </div>
      <div className={styles.urlInputContainer}>
        <label className={styles.urlLabel} htmlFor={projectUrl.id || 'url'}>
          Url
        </label>
        <input
          defaultValue={url.current}
          ref={url}
          className={styles.urlInput}
          id={projectUrl.id || 'url'}
          {...props}
        />
      </div>
      {children}
    </div>
  );
}

function ProjectTechs({project: {id: projectId, techs: projectTechs}, setProjects}) {
  const {techs, makeRequest, useFetch} = useContext(userContext);
  const remainingTechs = techs.filter(t => !projectTechs.find(({id}) => t.id === id));

  async function addTech(newTech) {
    await makeRequest({url: 'projects/url', body: newTech, method: 'post'});
    setProjects(pp => pp.map(p => (p.id === projectId ? {...p, techs: [...p.techs, newTech]} : p)));
  }
  async function removeTech(techId) {
    await makeRequest({url: `projects/${projectId}/tech/${techId}`, method: 'delete'});
    setProjects(pp =>
      pp.map(p => (p.id === projectId ? {...p, techs: p.techs.filter(t => t.id !== techId)} : p)),
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
        {remainingTechs.map(rt => (
          <option onClick={() => addTech(rt)} key={rt.id} value={rt.id}>
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
/*
function ProjectUrlAddForm({addUrl}) {
  const [url, setUrl] = useState('');
  const [urlName, setName] = useState('');

  const setNameHandler = e => setName(e.target.value);
  const setUrlHandler = e => setUrl(e.target.value);

  const handleAddUrl = async () => {
    await addUrl({url, name: urlName});
    // setUrl('');
    //setName('');
  };
  return (
    <ProjectUrlForm url={url} setUrl={setUrlHandler} urlName={urlName} setName={setNameHandler}>
      <div onClick={handleAddUrl} className={styles.addButton}>
        <CloseIcon size='20px' />
      </div>
    </ProjectUrlForm>
  );
}

function ProjectUrlUpdateForm({projectId, projectUrl, setProjects}) {
  const [url, setUrl] = useState(projectUrl.url);
  const [name, setName] = useState(projectUrl.name);
  const [nameOnFocus, setNameOnFocus] = useState(projectUrl.name);
  const [nameOnBlur, setNameOnBlur] = useState(projectUrl.name);
  const [urlOnFocus, setUrlOnFocus] = useState(projectUrl.url);
  const [urlOnBlur, setUrlOnBlur] = useState(projectUrl.url);

  const setNameHandler = e => setName(e.target.value);
  const setUrlHandler = e => setUrl(e.target.value);

  useEffect(() => {
    async function updateUrl() {
      const body = {...projectUrl, url: urlOnBlur, name: nameOnBlur};
      await makeRequest({url: `projects/url/${projectUrl.id}`, body, method: 'put'});
    }
    if (nameOnFocus !== nameOnBlur || urlOnFocus !== urlOnBlur) updateUrl();
  }, [nameOnFocus, nameOnBlur, urlOnFocus, urlOnBlur, makeRequest, projectUrl]);

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
    await makeRequest({url: `projects/url/${urlId}`, method: 'delete'});
    setProjects(pp =>
      pp
        .map(p => (p.id === projectId ? {...p, urls: p.urls.filter(u => u.id !== urlId)} : p))
        .sort((a, b) => a.name > b.name),
    );
  }

  return (
    <div className={styles.urlItem}>
      <ProjectUrlForm url={url} setUrl={setUrlHandler} urlName={name} setName={setNameHandler} />
      <div className={styles.deleteButton} onClick={removeUrl}>
        <CloseIcon size='20px' />
      </div>
    </div>
  );
}

*/
