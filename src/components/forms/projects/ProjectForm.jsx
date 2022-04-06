import { InfoContext } from 'App';
import Button from 'components/button/Button';
import CloseIcon from 'components/close-icon/CloseIcon';
import { adminApi } from 'index';
import React, { useContext, useRef, useState } from 'react';
import styles from './ProjectForm.module.css';

export default function ProjectForm({
  p = { title: '', description: '', projectImg: '', techs: [], urls: [] },
  i,
  hideForm,
}) {
  const projects = useContext(InfoContext).projects;
  const setProjects = useContext(InfoContext).setProjects;
  const techs = useContext(InfoContext).techs;

  const remainingTechs = [];

  const title = useRef(p.title);
  const description = useRef(p.description);
  const projectImg = useRef(p.projectImg);
  const newUrl = useRef('');
  const newUrlName = useRef('');
  const selectedTech = useRef('');

  const [showNewUrl, setShowNewUrl] = useState(false);

  for (const tech of techs) {
    if (!p.techs.find((pt) => tech.id === pt.id)) {
      remainingTechs.push(tech);
    }
  }
  async function submitHandler(event) {
    event.preventDefault();
    const newProject = {
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
    const newProjectList = [...projects];
    setProjects(newProjectList);
  }
  function addTech(i) {
    /* remainingTechs.forEach((rt, i) => {
      if (rt.id === selectedTech.current.value) {
        p.techs.push(rt);
        p.techs.sort((a, b) => a.name > b.name);
        remainingTechs.splice(i, 1);
      }
    }); */
    p.techs.push(remainingTechs[i]);
    p.techs.sort((a, b) => a.name > b.name);
    const newProjectList = [...projects];
    selectedTech.current.value = 'default';
    setProjects(newProjectList);
  }
  function removeTech(i) {
    p.techs.splice(i, 1);
    const newProjectList = [...projects];
    setProjects(newProjectList);
  }
  function addUrl() {
    const newUrlItem = {
      url: newUrl.current.value,
      name: newUrlName.current.value,
    };
    p.urls.push(newUrlItem);
    p.urls.sort((a, b) => a.name > b.name);
    setShowNewUrl(false);
    newUrl.current.value = '';
    newUrlName.current.value = '';
    const newProjectList = [...projects];
    setProjects(newProjectList);
  }
  function removeUrl(i) {
    p.urls.splice(i, 1);
    const newProjectList = [...projects];
    setProjects(newProjectList);
  }
  return (
    <form onSubmit={submitHandler} className={styles.projectForm}>
      <div className={styles.projectInputs}>
        <div className={styles.singleElements}>
          <div className={styles.inputLabel}>
            <label className={styles.projectLabel} htmlFor='title'>
              Title
            </label>
            <input
              defaultValue={p.title}
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
              defaultValue={p.description}
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
              defaultValue={p.projectImg}
              className={styles.projectInput}
              ref={projectImg}
              name='projectImg'
              id='projectImg'
            />
          </div>
        </div>
        <div className={styles.urlsSection}>
          <p className={styles.projectLabel}>Urls</p>
          <div className={styles.urlsContainer}>
            {p.urls.map((pu, i) => (
              <div key={pu.id ? pu.id : i} className={styles.urlItem}>
                <div className={styles.urlContainer}>
                  <div className={styles.urlInputContainer}>
                    <label className={styles.urlLabel} htmlFor={pu.id}>
                      Name
                    </label>
                    <input
                      defaultValue={pu.name}
                      className={styles.urlInput}
                      name='urlItem'
                      id={pu.id}
                    />
                  </div>
                  <div className={styles.urlInputContainer}>
                    <label className={styles.urlLabel} htmlFor={pu.id}>
                      Url
                    </label>
                    <input
                      defaultValue={pu.url}
                      className={styles.urlInput}
                      name='urlItem'
                      id={pu.id}
                    />
                  </div>
                </div>
                <div className={styles.deleteButton} onClick={() => removeUrl(i)}>
                  <CloseIcon size='20px' />
                </div>
              </div>
            ))}
          </div>
          {showNewUrl && (
            <div className={styles.urlContainer}>
              <div className={styles.urlInputContainer}>
                <label className={styles.urlLabel} htmlFor='newUrlName'>
                  Name
                </label>
                <input
                  ref={newUrlName}
                  className={styles.urlInput}
                  name='newUrlName'
                  id='newUrlName'
                />
              </div>
              <div className={styles.urlInputContainer}>
                <label className={styles.urlLabel} htmlFor='newUrl'>
                  Url
                </label>
                <input ref={newUrl} className={styles.urlInput} name='newUrl' id='newUrl' />
              </div>
              <div onClick={() => addUrl()} className={styles.addButton}>
                <CloseIcon size='20px' />
              </div>
            </div>
          )}
          <div
            className={styles.toggleAddUrlButton}
            onClick={(e) => {
              e.preventDefault();
              setShowNewUrl(!showNewUrl);
            }}
          >
            <Button>Add url</Button>
          </div>
        </div>
        <div className={styles.techsSection}>
          <p className={styles.projectLabel}>Techs</p>
          {p.techs.map((pt, i) => (
            <div key={pt.id} className={styles.techContainer}>
              <span>{pt.name}</span>
              <div onClick={() => removeTech(i)}>
                <CloseIcon size='20px' />
              </div>
            </div>
          ))}
          <select ref={selectedTech} defaultValue='default'>
            <option value='default' disabled>
              Add a tech
            </option>
            {remainingTechs.map((rt, i) => (
              <option onClick={() => addTech(i)} key={rt.id} value={rt.id}>
                {rt.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <Button onClick={(e) => submitHandler(e)}>Save</Button>
      </div>
    </form>
  );
}
//
