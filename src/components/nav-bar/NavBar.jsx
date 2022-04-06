import { useContext, useEffect, useState } from 'react';
import { InfoContext } from 'App';
import styles from './NavBar.module.css';
import Button from 'components/button/Button';
import CloseAndEdit from 'components/close-icon/CloseAndEdit';
import { adminApi } from 'index';
import LoadingIcon from 'components/loading-icon/LoadingIcon';
import DropDownIcon from 'components/drop-down-icon/DropDownIcon';

const NavBar = ({ showLoginModal, setShowLoginModal, u, i }) => {
  const users = useContext(InfoContext).users;
  const setUsers = useContext(InfoContext).setUsers;
  const loggedIn = useContext(InfoContext).loggedIn;
  const setLoggedIn = useContext(InfoContext).setLoggedIn;

  const [editLinks, setEditLinks] = useState('');
  const [dropDownState, setDropDownState] = useState(false);

  useEffect(() => !loggedIn && setEditLinks(false), [loggedIn]);

  async function saveUser() {
    await adminApi.put('/users', users[i]);
  }
  function logout() {
    sessionStorage.removeItem('accessToken');
    setLoggedIn(false);
  }
  return (
    <nav>
      <div className={styles.desktop}>
        <div className={styles.navLeftContainer}>
          <div className={styles.APLogoContainer}>
            <img className={styles.navImg} src='assets/logos/AP.png' alt='AP logo' />
          </div>
          {loggedIn && (
            <div onClick={() => saveUser()} className={styles.navButton}>
              <Button>Save user</Button>
            </div>
          )}
        </div>
        <div className={styles.navRightContainer}>
          {loggedIn && <CloseAndEdit toggleEdit={() => setEditLinks(!editLinks)} />}
          {u ? (
            !editLinks ? (
              <div className={styles.social}>
                <a className={styles.imgLink} href={u.linkedInUrl}>
                  <img
                    className={styles.navImg}
                    src='/assets/logos/GitHub-Mark-64px.png'
                    alt='AP logo'
                  />
                </a>
                <a className={styles.imgLink} href={u.githubUrl}>
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
                    defaultValue={u.linkedInUrl}
                    className={styles.linksInput}
                    onInput={({ target: { value } }) => {
                      users[i] = {
                        ...u,
                        linkedInUrl: value,
                      };
                      console.log(users[i].linkedInUrl);
                      setUsers([...users]);
                    }}
                    name='linkedInUrl'
                    id='linkedInUrl'
                  />
                </div>
                <div className={styles.inputLabel}>
                  <label className={styles.linksLabel} htmlFor='githubUrl'>
                    Github Url
                  </label>
                  <input
                    defaultValue={u.githubUrl}
                    className={styles.linksInput}
                    onInput={({ target: { value } }) => {
                      users[i] = {
                        ...u,
                        githubUrl: value,
                      };
                      setUsers([...users]);
                    }}
                    name='githubUrl'
                    id='githubUrl'
                  />
                </div>
              </div>
            )
          ) : (
            <LoadingIcon />
          )}

          <div
            onClick={() => (!loggedIn ? setShowLoginModal(!showLoginModal) : logout())}
            className={styles.navButton}
          >
            <Button>{loggedIn ? 'Log out' : 'Log in'}</Button>
          </div>
        </div>
      </div>
      <div className={styles.cellphone}>
        <div
          className={`${styles.cellElements} ${!dropDownState && styles.cellElementsTransition}`}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {loggedIn && <CloseAndEdit toggleEdit={() => setEditLinks(!editLinks)} />}
            {u ? (
              !editLinks ? (
                <>
                  <a className={styles.imgLink} href={u.linkedInUrl}>
                    <img
                      className={styles.navImg}
                      src='/assets/logos/GitHub-Mark-64px.png'
                      alt='AP logo'
                    />
                  </a>
                  <a className={styles.imgLink} href={u.githubUrl}>
                    <img className={styles.navImg} src='/assets/logos/linkedin.png' alt='AP logo' />
                  </a>
                </>
              ) : (
                <div className={styles.socialInputs}>
                  <div className={styles.inputLabel}>
                    <label className={styles.linksLabel} htmlFor='linkedInUrl'>
                      Linkedin Url
                    </label>
                    <input
                      defaultValue={u.linkedInUrl}
                      className={styles.linksInput}
                      onInput={({ target: { value } }) => {
                        users[i] = {
                          ...u,
                          linkedInUrl: value,
                        };
                        console.log(users[i].linkedInUrl);
                        setUsers([...users]);
                      }}
                      name='linkedInUrl'
                      id='linkedInUrl'
                    />
                  </div>
                  <div className={styles.inputLabel}>
                    <label className={styles.linksLabel} htmlFor='githubUrl'>
                      Github Url
                    </label>
                    <input
                      defaultValue={u.githubUrl}
                      className={styles.linksInput}
                      onInput={({ target: { value } }) => {
                        users[i] = {
                          ...u,
                          githubUrl: value,
                        };
                        setUsers([...users]);
                      }}
                      name='githubUrl'
                      id='githubUrl'
                    />
                  </div>
                </div>
              )
            ) : (
              <LoadingIcon />
            )}
          </div>
          <div
            onClick={() => (!loggedIn ? setShowLoginModal(!showLoginModal) : logout())}
            className={styles.navButton}
          >
            <Button>{loggedIn ? 'Log out' : 'Log in'}</Button>
          </div>
        </div>
        <DropDownIcon onClick={() => setDropDownState(!dropDownState)} />
      </div>
    </nav>
  );
};
export default NavBar;
