import {useContext, useEffect, useState} from 'react';
import {userContext} from 'components/contexts/user/UserContext';
import CloseAndEdit from 'components/close-icon/CloseAndEdit';
import Techs from './Techs';
import styles from './TechsAndInfo.module.css';

export default function TechsAndInfo() {
  const {loggedIn, user, setUser, loadingUser, saveUser} = useContext(userContext);
  const [editAboutMe, setEditAboutMe] = useState(false);
  useEffect(() => {
    if (!loggedIn) setEditAboutMe(false);
  }, [loggedIn]);

  async function handleToggle() {
    try {
      if (editAboutMe) await saveUser();
      setEditAboutMe(ps => !ps);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <section className={styles.techsAndInfoSection}>
      <div className={styles.personalInfo}>
        <h2 className={`${styles.personalInfoTitle} textShadowLight`}>I&apos;m a web developer</h2>
        {loadingUser ||
          when(!loggedIn)
            .return(<p className={styles.aboutMe}>{user.aboutMe}</p>)
            .else(
              <>
                <CloseAndEdit toggleEdit={handleToggle} />
                {when(!editAboutMe)
                  .return(<p className={styles.aboutMe}>{user.aboutMe}</p>)
                  .else(
                    <textarea
                      defaultValue={user.aboutMe}
                      className={styles.aboutMeInput}
                      onChange={e => setUser(pu => ({...pu, aboutMe: e.target.value}))}
                    />,
                  )}
              </>,
            )}
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
