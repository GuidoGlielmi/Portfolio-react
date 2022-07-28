import React, {useContext, useEffect, useState} from 'react';
import {InfoContext} from 'App';
import styles from './TechsAndInfo.module.css';
import CloseAndEdit from 'components/close-icon/CloseAndEdit';
import LoadingIcon from 'components/loading-icon/LoadingIcon';
import Techs from './Techs';
export default function TechsAndInfo({user, i}) {
  const {loggedIn, users, setUsers} = useContext(InfoContext);
  const [editAboutMe, setEditAboutMe] = useState(false);
  useEffect(() => {
    if (!loggedIn) setEditAboutMe(false);
  }, [loggedIn]);
  return (
    <section className={styles.techsAndInfoSection}>
      <div className={styles.personalInfo}>
        <h2 className={`${styles.personalInfoTitle} textShadowLight`}>I'm a web developer</h2>
        {when(!user)
          .return(<LoadingIcon />)
          .elseWhen(!loggedIn)
          .return(<p className={styles.aboutMe}>{user.aboutMe}</p>)
          .else(
            <>
              <CloseAndEdit toggleEdit={() => setEditAboutMe(!editAboutMe)} />
              {when(!editAboutMe)
                .return(<p className={styles.aboutMe}>{user.aboutMe}</p>)
                .else(
                  <textarea
                    defaultValue={user.aboutMe}
                    className={styles.aboutMeInput}
                    onInput={({target: {value}}) => {
                      users[i] = {
                        ...user,
                        aboutMe: value,
                      };
                      setUsers([...users]);
                    }}
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
