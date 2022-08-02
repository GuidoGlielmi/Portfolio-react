import {useContext, useEffect, useRef, useState} from 'react';
import {loginContext} from 'components/contexts/login/LoginContext';
import {userContext} from 'components/contexts/user/UserContext';
import Button from 'components/button/Button';
import {Edit} from 'components/close-icon/CloseAndEdit';
import DropDownIcon from 'components/drop-down-icon/DropDownIcon';
import LoginModal from 'components/login-modal/LoginModal';
import styles from './NavBar.module.css';

export default function NavBar() {
  const {setLoggedIn} = useContext(loginContext);

  const [editLinks, setEditLinks] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);

  const logout = () => setLoggedIn(false);

  return (
    <>
      <LoginModalBackground showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} />
      <nav>
        <MobileNavBar
          setShowLoginModal={setShowLoginModal}
          logout={logout}
          editLinks={editLinks}
          setEditLinks={setEditLinks}
        />
        <DesktopNavBar
          setShowLoginModal={setShowLoginModal}
          logout={logout}
          editLinks={editLinks}
          setEditLinks={setEditLinks}
        />
      </nav>
    </>
  );
}

function DesktopNavBar({setShowLoginModal, logout, editLinks, setEditLinks}) {
  const {loadingUser, user, saveUser} = useContext(userContext);
  const {loggedIn} = useContext(loginContext);
  useEffect(() => !loggedIn && setEditLinks(false), [loggedIn, setEditLinks]);

  async function handleToggle() {
    try {
      if (editLinks) await saveUser();
      setEditLinks(ps => !ps);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.desktop}>
      <div className={styles.navLeftContainer}>
        <div className={styles.APLogoContainer}>
          <img className={styles.navImg} src='assets/logos/AP.png' alt='AP logo' />
        </div>
      </div>
      <div className={styles.navRightContainer}>
        {loggedIn && <Edit toggleEdit={handleToggle} />}
        {loadingUser ||
          (editLinks ? (
            <UserForm />
          ) : (
            <div className={styles.social}>
              <a className={styles.imgLink} href={user.linkedInUrl}>
                <img
                  className={styles.navImg}
                  src='/assets/logos/GitHub-Mark-64px.png'
                  alt='AP logo'
                />
              </a>
              <a className={styles.imgLink} href={user.githubUrl}>
                <img className={styles.navImg} src='/assets/logos/linkedin.png' alt='AP logo' />
              </a>
            </div>
          ))}
        <div
          onClick={() => (!loggedIn ? setShowLoginModal(ps => !ps) : logout())}
          className={styles.navButton}
        >
          <Button>{loggedIn ? 'Log out' : 'Log in'}</Button>
        </div>
      </div>
    </div>
  );
}

const UserForm = () => {
  const {user, setUser} = useContext(userContext);

  return (
    <div className={styles.social}>
      <div className={styles.inputLabel}>
        <label className={styles.linksLabel} htmlFor='linkedInUrl'>
          Linkedin Url
        </label>
        <input
          defaultValue={user.linkedInUrl}
          className={styles.linksInput}
          onChange={e => setUser(pu => ({...pu, linkedInUrl: e.target.value}))}
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
          onChange={e => setUser(pu => ({...pu, githubUrl: e.target.value}))}
          name='githubUrl'
          id='githubUrl'
        />
      </div>
    </div>
  );
};

function MobileNavBar({setShowLoginModal, logout, editLinks, setEditLinks}) {
  const {loadingUser, user, setUser, saveUser} = useContext(userContext);
  const {loggedIn} = useContext(loginContext);

  const [dropDownDisplayed, setDropDownDisplayed] = useState(false);
  useEffect(() => !loggedIn && setEditLinks(false), [loggedIn, setEditLinks]);

  function handleToggle() {
    if (editLinks) saveUser();
    setEditLinks(ps => !ps);
  }

  return (
    <div className={styles.mobile}>
      <div
        className={`${styles.cellElements} ${!dropDownDisplayed && styles.cellElementsTransition}`}
      >
        <div style={{display: 'flex', alignItems: 'center'}}>
          {loggedIn && <Edit toggleEdit={handleToggle} />}
          {loadingUser ||
            (!editLinks ? (
              <>
                <a className={styles.imgLink} href={user.linkedInUrl}>
                  <img
                    className={styles.navImg}
                    src='/assets/logos/GitHub-Mark-64px.png'
                    alt='AP logo'
                  />
                </a>
                <a className={styles.imgLink} href={user.githubUrl}>
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
                    defaultValue={user.linkedInUrl}
                    className={styles.linksInput}
                    onChange={e => setUser(pu => ({...pu, linkedInUrl: e.target.value}))}
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
                    onChange={e => setUser(pu => ({...pu, githubUrl: e.target.value}))}
                    name='githubUrl'
                    id='githubUrl'
                  />
                </div>
              </div>
            ))}
        </div>
        <div
          onClick={() => (!loggedIn ? setShowLoginModal(ps => !ps) : logout())}
          className={styles.navButton}
        >
          <Button>{loggedIn ? 'Log out' : 'Log in'}</Button>
        </div>
      </div>
      <DropDownIcon onClick={() => setDropDownDisplayed(ps => !ps)} />
    </div>
  );
}

function LoginModalBackground({showLoginModal, setShowLoginModal}) {
  const modalBackground = useRef();
  return (
    <div
      ref={modalBackground}
      id='modalBackground'
      onClick={e => e.target.id === modalBackground.current.id && setShowLoginModal(ps => !ps)}
      className={`${styles.modalBackground} ${!showLoginModal && styles.modalBackgroundFade}`}
    >
      <LoginModal willResetErrorMsg={!showLoginModal} closeModal={() => setShowLoginModal(false)} />
    </div>
  );
}
