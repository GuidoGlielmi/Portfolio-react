import React, { useContext, useRef, useState } from 'react';
import { InfoContext } from 'App';
import styles from './TechsAndInfo.module.css';
import TechItem from './TechItem';
import CloseAndEdit from 'components/close-icon/CloseAndEdit';
export default function TechsAndInfo() {
  const loggedIn = true;
  const [editAboutMe, setEditAboutMe] = useState(false);
  const user = useContext(InfoContext).user[0];
  const techs = useContext(InfoContext).techs;
  // const loggedIn = useContext(InfoContext).loggedIn;
  const techImg = useRef('');
  const techsContainer = useRef('');
  const loading = 'loading...';
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
                <textarea defaultValue={user.aboutMe} className={styles.aboutMeInput} />
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
            ? techs.map((t) => (
                <div ref={techImg}>
                  <TechItem t={t} />
                </div>
              ))
            : loading}
          {techs
            ? techs.map((t, i) => (
                <div ref={techImg}>
                  <TechItem t={t} />
                </div>
              ))
            : loading}
        </div>
      </div>
    </section>
  );
}
