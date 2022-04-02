import { InfoContext } from 'App';
import Button from 'components/button/Button';
import CloseIcon from 'components/close-icon/CloseIcon';
import React, { useContext, useRef, useState } from 'react';
import styles from './ProjectForm.module.css';

export default function ProjectForm({ p }) {
  const techs = useContext(InfoContext).techs;
  const setTechs = useContext(InfoContext).setTechs;
  const remainingTechs = [];
  for (const tech of techs) {
    if (!p.techs.find((pt) => tech.id === pt.id)) {
      remainingTechs.push(tech);
    }
  }
  const newUrl = {
    url: '',
    name: '',
  };
  const title = useRef('');
  const description = useRef('');
  const urls = useRef([]);
  const projectTechs = useRef('');
  const projectImg = useRef('');
  const [showNewUrl, setShowNewUrl] = useState(false);
  function submit(e) {
    e.preventDefault();
  }
  return (
    <form onSubmit={submit} className={styles.projectForm}>
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
            {p.urls.map((pu) => (
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
            ))}
          </div>
          {showNewUrl && (
            <div className={styles.urlContainer}>
              <div className={styles.urlInputContainer}>
                <label className={styles.urlLabel} htmlFor='newUrlName'>
                  Name
                </label>
                <input className={styles.urlInput} name='newUrlName' id='newUrlName' />
              </div>
              <div className={styles.urlInputContainer}>
                <label className={styles.urlLabel} htmlFor='newUrl'>
                  Url
                </label>
                <input className={styles.urlInput} name='newUrl' id='newUrl' />
              </div>
              <div className={styles.addUrlButton}>
                <CloseIcon size='20px' />
              </div>
            </div>
          )}
          <div
            className={styles.toggleAddUrlButton}
            clas
            onClick={() => setShowNewUrl(!showNewUrl)}
          >
            <Button>Add url</Button>
          </div>
        </div>
        <div className={styles.techsSection}>
          <p className={styles.projectLabel}>Techs</p>
          {p.techs.map((rt) => (
            <div className={styles.techContainer}>
              <span>{rt.name}</span>
              <CloseIcon size='20px' />
            </div>
          ))}
        </div>
      </div>
      <div>
        <Button onClick={(e) => submit(e)}>Save</Button>
      </div>
    </form>
  );
}
//
