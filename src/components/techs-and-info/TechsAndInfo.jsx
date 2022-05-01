import React, { useContext, useEffect, useState } from 'react';
import { InfoContext } from 'App';
import styles from './TechsAndInfo.module.css';
import CloseAndEdit from 'components/close-icon/CloseAndEdit';
import LoadingIcon from 'components/loading-icon/LoadingIcon';
import Techs from './Techs';
export default function TechsAndInfo({ user, i }) {
  const loggedIn = useContext(InfoContext).loggedIn;
  const [editAboutMe, setEditAboutMe] = useState(false);
  const users = useContext(InfoContext).users;
  const setUsers = useContext(InfoContext).setUsers;
  useEffect(() => {
    if (!loggedIn) {
      setEditAboutMe(false);
    }
  }, [loggedIn]);
  return (
    <section className={styles.techsAndInfoSection}>
      <div className={styles.personalInfo}>
        <h2 className={`${styles.personalInfoTitle} textShadowLight`}>I'm a web developer</h2>
        {user ? (
          !loggedIn ? (
            <p className={styles.aboutMe}>{user.aboutMe}</p>
          ) : (
            <>
              <CloseAndEdit toggleEdit={() => setEditAboutMe(!editAboutMe)} />
              {editAboutMe ? (
                <textarea
                  defaultValue={user.aboutMe}
                  className={styles.aboutMeInput}
                  onInput={({ target: { value } }) => {
                    users[i] = {
                      ...user,
                      aboutMe: value,
                    };
                    setUsers([...users]);
                  }}
                />
              ) : (
                <p className={styles.aboutMe}>{user.aboutMe}</p>
              )}
            </>
          )
        ) : (
          <LoadingIcon />
        )}
      </div>
      <Techs />
    </section>
  );
}
