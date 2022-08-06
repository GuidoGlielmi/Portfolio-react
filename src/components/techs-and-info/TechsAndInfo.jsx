import {useContext, useEffect, useState} from 'react';
import {loginContext} from 'components/contexts/login/LoginContext';
import {userContext} from 'components/contexts/user/UserContext';
import CloseAndEdit from 'components/close-icon/CloseAndEdit';
import Techs from './Techs';
import styles from './TechsAndInfo.module.css';

export default function TechsAndInfo() {
  const {user, setUser, loadingUser, saveUser} = useContext(userContext);
  const {loggedIn} = useContext(loginContext);

  const [editAboutMe, setEditAboutMe] = useState(false);
  useEffect(() => {
    if (!loggedIn) setEditAboutMe(false);
  }, [loggedIn]);

  async function handleToggle() {
    try {
      if (editAboutMe) await saveUser();
      setEditAboutMe(ps => !ps);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className={styles.techsAndInfoSection}>
      <div className={styles.personalInfo}>
        <h2>I&apos;m a web developer</h2>
        {loggedIn && <CloseAndEdit toggleEdit={handleToggle} />}
        {loadingUser || (
          <>
            <p>{user.aboutMe}</p>
            {editAboutMe && (
              <textarea
                defaultValue={user.aboutMe}
                onChange={e => setUser(pu => ({...pu, aboutMe: e.target.value}))}
              />
            )}
          </>
        )}
        <a href='./assets/Guido-Glielmi-RESUME.pdf' download>
          Download my CV
        </a>
        <a href='./assets/Guido-Glielmi-RESUME(es).pdf' download>
          Download my CV (es)
        </a>
      </div>
      <Techs />
    </section>
  );
}
export const when = (condition, value) => ({
  elseWhen: newCondition => when(condition || newCondition, value),
  return: v => when(condition, condition === true ? value ?? v : null),
  else: v => value ?? v,
  get: value,
});
