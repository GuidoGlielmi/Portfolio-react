import { useContext } from 'react';
import { InfoContext } from 'App';
import styles from './NavBar.module.css';
import Button from 'components/button/Button';

const NavBar = () => {
  const user = useContext(InfoContext).user[0];
  const loggedIn = useContext(InfoContext).loggedIn;
  const loading = 'loading...';

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
          <div className={styles.navButton}>
            <Button>Save user</Button>
          </div>
        </div>
        <div className={styles.navRightContainer}>
          <div className={styles.navElementContainer}>editAndClose</div>
          {!loggedIn && (
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
          )}
          {loggedIn && (
            <div className={styles.social}>
              <div className={styles.navElementContainer}>
                <input src='/assets/logos/AP' alt='AP logo' />
              </div>
              <div className={styles.navElementContainer}>
                <input src='/assets/logos/AP' alt='AP logo' />
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
