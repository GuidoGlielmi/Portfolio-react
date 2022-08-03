import {userFeedbackContext} from 'components/contexts/user-feedback/UserFeedbackContext';
import {userContext} from 'components/contexts/user/UserContext';
import Button from 'components/button/Button';
import CloseIcon from 'components/close-icon/CloseIcon';
import {useContext, useRef, useState} from 'react';
import styles from './ProjectForm.module.css';

const initialProject = {title: '', description: '', projectImg: '', techs: [], urls: []};
export default function ProjectForm({project = initialProject, handleSubmit}) {
  const [urls, setUrls] = useState(project.urls);
  const [techs, setTechs] = useState(project.techs);
  const title = useRef(project.title);
  const description = useRef(project.description);
  const projectImg = useRef(project.projectImg);

  function onSubmit(e) {
    e.preventDefault();
    handleSubmit({
      ...project,
      title: title.current.value,
      description: description.current.value,
      projectImg: projectImg.current.value,
      urls,
      techs,
    });
  }

  return (
    <form onSubmit={onSubmit} className={styles.projectForm}>
      <div /* className={styles.projectInputs} */>
        <div /* className={styles.singleElements} */>
          <div className={styles.inputContainer}>
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
          <div className={styles.inputContainer}>
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
          <div className={styles.inputContainer}>
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
        <ProjectUrls urls={urls} setUrls={setUrls} projectId={project.id} />
        <ProjectTechs project={project} techs={techs} setTechs={setTechs} projectId={project.id} />
      </div>
      <div>
        <Button>Save</Button>
      </div>
    </form>
  );
}

function ProjectUrls({urls, setUrls, projectId}) {
  const [showNewUrl, setShowNewUrl] = useState(false);

  return (
    <div className={styles.urlsSection}>
      <h4 /* className={styles.projectLabel} */>Urls</h4>
      <div className={styles.urls}>
        {urls.map((u, i) => (
          <ProjectUrlFormHandler
            key={u.id || i}
            index={i}
            projectUrl={u}
            setUrls={setUrls}
            projectId={projectId}
          />
        ))}
      </div>
      {showNewUrl && (
        <ProjectUrlFormHandler
          setUrls={setUrls}
          setShowNewUrl={setShowNewUrl}
          projectId={projectId}
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
  projectId,
  projectUrl = initialUrl,
  setUrls,
  setShowNewUrl,
  index,
}) {
  const {makeRequest} = useContext(userFeedbackContext);
  const isRegisteredUrl = !!projectUrl.id;
  const isExistentProject = !!projectUrl.projectId || !!projectId;
  const isAlreadyAdded = projectUrl !== initialUrl;
  const url = useRef({projectId, ...projectUrl});

  const updateNewUrl = newUrl => (url.current = newUrl);

  const updateExistentUrl = newUrl => setUrls(pu => pu.map(p => (p.id === newUrl.id ? newUrl : p)));

  async function addToExistentProject() {
    try {
      const newUrl = url.current;
      const addedUrlId = await makeRequest(
        {url: 'projects/url', body: newUrl, method: 'post'},
        'Url item added',
      );
      newUrl.id = addedUrlId;
      setUrls(pt => [...pt, newUrl]);
      setShowNewUrl(false);
    } catch (err) {
      console.log(err);
    }
  }

  function addToProject() {
    const newUrl = url.current;
    setUrls(pu => [...pu, newUrl]);
    setShowNewUrl(false);
  }

  async function removeExistentUrl() {
    try {
      await makeRequest(
        {url: `projects/url/${projectUrl.id}`, method: 'delete'},
        'Url item deleted',
      );
      setUrls(pu => pu.filter(u => u.id !== projectUrl.id));
    } catch (err) {
      console.log(err);
    }
  }

  const removeUrl = () => setUrls(pu => pu.filter((_u, i) => i !== index));

  return (
    <div className={styles.urlContainer}>
      <ProjectUrlForm
        projectUrl={url.current}
        handleChange={isRegisteredUrl ? updateExistentUrl : updateNewUrl}
      >
        {!isAlreadyAdded && (
          <div
            onClick={isExistentProject ? addToExistentProject : addToProject}
            className={styles.addButton}
          >
            <CloseIcon size='20px' />
          </div>
        )}
      </ProjectUrlForm>
      {isAlreadyAdded && (
        <div
          className={styles.deleteButton}
          onClick={isRegisteredUrl ? removeExistentUrl : removeUrl}
        >
          <CloseIcon size='20px' />
        </div>
      )}
    </div>
  );
}

function ProjectUrlForm({children, projectUrl, handleChange}) {
  const url = useRef(projectUrl.url);
  const name = useRef(projectUrl.name);
  const onChange = () =>
    handleChange({
      ...projectUrl,
      url: url.current.value,
      name: name.current.value,
    });

  return (
    <div className={styles.url}>
      <div /* className={styles.urlInputContainer} */>
        <label /* className={styles.urlLabel} */ htmlFor={projectUrl.id || 'name'}>Name</label>
        <input
          defaultValue={name.current}
          ref={name}
          onChange={onChange}
          /* className={styles.urlInput} */
          id={projectUrl.id || 'name'}
        />
      </div>
      <div /* className={styles.urlInputContainer} */>
        <label /* className={styles.urlLabel} */ htmlFor={projectUrl.id || 'url'}>Url</label>
        <input
          defaultValue={url.current}
          ref={url}
          onChange={onChange}
          /* className={styles.urlInput} */
          id={projectUrl.id || 'url'}
        />
      </div>
      {children}
    </div>
  );
}

function ProjectTechs({project: {id: projectId}, techs, setTechs}) {
  const {techs: allTechs} = useContext(userContext);
  const {makeRequest} = useContext(userFeedbackContext);
  const remainingTechs = allTechs.filter(t => !techs.find(({id}) => t.id === id));
  const remainingTechsNode = useRef();

  async function addTech(newTech) {
    try {
      if (projectId) {
        await makeRequest(
          {
            url: `projects/${projectId}/tech/${newTech.id}`,
            body: newTech,
            method: 'post',
          },
          'The technology has been added',
        );
      }
      setTechs(pt => [...pt, newTech]);
      remainingTechsNode.current.value = '';
    } catch (err) {
      console.log(err);
    }
  }

  async function removeTech(techId) {
    try {
      if (projectId) {
        await makeRequest(
          {
            url: `projects/${projectId}/tech/${techId}`,
            method: 'delete',
          },
          'The technology has been removed',
        );
      }
      setTechs(pt => pt.filter(t => t.id !== techId));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.techsSection}>
      <h4 /* className={styles.projectLabel} */>Techs</h4>
      {techs.map(t => (
        <ProjectTech key={t.id} tech={t} removeTech={removeTech} />
      ))}
      <select ref={remainingTechsNode} defaultValue=''>
        <option value='' disabled>
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
    <div key={id} className={styles.tech}>
      <span>{name}</span>
      <div onClick={handleRemoveTech}>
        <CloseIcon size='20px' />
      </div>
    </div>
  );
}
