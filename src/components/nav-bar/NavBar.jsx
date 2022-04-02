import { useContext, useRef, useState } from 'react';
import { InfoContext } from 'App';
import styles from './NavBar.module.css';
import Button from 'components/button/Button';
import CloseAndEdit from 'components/close-icon/CloseAndEdit';

const NavBar = () => {
  const user = useContext(InfoContext).user[0];
  const loggedIn = true;
  const loading = 'loading...';
  const linkedInUrl = useRef('');
  const githubUrl = useRef('');
  const [editLinks, setEditLinks] = useState('');
  return (
    (
      <nav>
        <div className={styles.navLeftContainer}>
          <div className={styles.navElementContainer}>
            <img className={styles.navImg} src='assets/logos/AP.png' alt='AP logo' />
          </div>
          <a className={styles.yoProgramoLink} href='http://www.yoprogramo.org.ar/'>
            #YoProgramo
          </a>
          <div className={styles.navButton}>{loggedIn && <Button>Save user</Button>}</div>
        </div>
        <div className={styles.navRightContainer}>
          {loggedIn && <CloseAndEdit toggleEdit={() => setEditLinks(!editLinks)} />}
          {!editLinks ? (
            <div className={styles.social}>
              <a className={styles.imgLink} href={user?.linkedInUrl}>
                <img
                  className={styles.navImg}
                  src='/assets/logos/GitHub-Mark-64px.png'
                  alt='AP logo'
                />
              </a>
              <a className={styles.imgLink} href={user?.githubUrl}>
                <img className={styles.navImg} src='/assets/logos/linkedin.png' alt='AP logo' />
              </a>
            </div>
          ) : (
            <div className={styles.social}>
              <div className={styles.inputLabel}>
                <label className={styles.linksLabel} htmlFor='linkedInUrl'>
                  Linkedin Url
                </label>
                <input
                  defaultValue={user.g}
                  className={styles.linksInput}
                  ref={linkedInUrl}
                  name='linkedInUrl'
                  id='linkedInUrl'
                />
              </div>
              <div className={styles.inputLabel}>
                <label className={styles.linksLabel} htmlFor='githubUrl'>
                  Github Url
                </label>
                <input
                  defaultValue={user.githubUrl}
                  className={styles.linksInput}
                  ref={githubUrl}
                  name='githubUrl'
                  id='githubUrl'
                />
              </div>
            </div>
          )}

          <div className={styles.navButton}>
            <Button>Log in</Button>
          </div>
        </div>
      </nav>
    ) || loading
  );
};
export default NavBar;
