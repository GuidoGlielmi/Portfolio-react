import React, { useContext, useEffect, useRef, useState } from 'react';
import { InfoContext } from 'App';
import styles from './TechsAndInfo.module.css';
import TechItem from './TechItem';
import CloseAndEdit from 'components/close-icon/CloseAndEdit';
import TechForm from 'components/forms/techs/TechForm';
import Button from 'components/button/Button';
export default function TechsAndInfo({ user, i }) {
  const loggedIn = useContext(InfoContext).loggedIn;
  const [editAboutMe, setEditAboutMe] = useState(false);
  const [showNewForm, setShowNewForm] = useState(false);
  const techs = useContext(InfoContext).techs;
  const users = useContext(InfoContext).users;
  const setUsers = useContext(InfoContext).setUsers;
  const techImg = useRef('');
  const techsContainer = useRef('');
  const loading = 'loading...';
  useEffect(() => {
    if (!loggedIn) {
      setEditAboutMe(false);
      setShowNewForm(false);
    }
  }, [loggedIn]);
  function onWheel(e) {
    let scrollUnit = techImg.current.offsetWidth;
    let currentValue = techsContainer.current.scrollLeft;
    let maxValue = techsContainer.current.scrollLeftMax;
    let totalWidth = techsContainer.current.scrollWidth;
    if (e.deltaY > 0) {
      if (maxValue - currentValue < scrollUnit) {
        techsContainer.current.style['scroll-behavior'] = 'auto';
        techsContainer.current.scrollLeft = currentValue - totalWidth / 2;
        techsContainer.current.style['scroll-behavior'] = 'smooth';
        techsContainer.current.scrollLeft = currentValue - totalWidth / 2 + scrollUnit;
      } else {
        techsContainer.current.scrollLeft = currentValue + scrollUnit;
      }
    } else {
      if (currentValue - scrollUnit < scrollUnit) {
        techsContainer.current.style['scroll-behavior'] = 'auto';
        techsContainer.current.scrollLeft = currentValue - totalWidth / 2;
        techsContainer.current.style['scroll-behavior'] = 'smooth';
        techsContainer.current.scrollLeft = totalWidth / 2 + Math.abs(currentValue - scrollUnit);
      } else {
        techsContainer.current.scrollLeft = currentValue - scrollUnit;
      }
    }
  }
  return (
    <section className={styles.techsAndInfoSection}>
      <div className={styles.personalInfo}>
        <h2 className={styles.personalInfoTitle}>I'm a web developer</h2>
        {user ? (
          !loggedIn ? (
            <>
              <p className={styles.aboutMe}>{user.aboutMe}</p>
            </>
          ) : (
            <>
              {loggedIn && <CloseAndEdit toggleEdit={() => setEditAboutMe(!editAboutMe)} />}
              {editAboutMe && (
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
              )}
              {!editAboutMe && <p className={styles.aboutMe}>{user.aboutMe}</p>}
            </>
          )
        ) : (
          loading
        )}
      </div>
      <div className={styles.techsSection}>
        <p className={styles.techsTitle}>Some technologies i'm familiar with</p>
        <div ref={techsContainer} onWheel={(e) => onWheel(e)} className={styles.techsContainer}>
          {techs
            ? techs.map((t, i) => (
                <div key={t.id} ref={techImg}>
                  <TechItem t={t} i={i} />
                </div>
              ))
            : loading}
          {techs
            ? techs.map((t, i) => (
                <div key={t.id} ref={techImg}>
                  <TechItem t={t} i={i} />
                </div>
              ))
            : loading}
        </div>
      </div>
      {showNewForm && <TechForm />}
      {loggedIn && (
        <div onClick={() => setShowNewForm(!showNewForm)} className={styles.addButton}>
          <Button>Add tech</Button>
        </div>
      )}
    </section>
  );
}
