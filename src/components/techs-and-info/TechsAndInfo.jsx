import React, { useContext, useRef } from 'react';
import { InfoContext } from 'App';
import styles from './TechsAndInfo.module.css';
export default function TechsAndInfo() {
  const user = useContext(InfoContext).user[0];
  const techs = useContext(InfoContext).techs;
  const loggedIn = useContext(InfoContext).loggedIn;
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
        techsContainer.current.scrollTo({
          left: (techsContainer.current.scrollLeft = currentValue - totalWidth / 2),
          behavior: 'auto',
        });
        techsContainer.current.scrollTo({
          left: (techsContainer.current.scrollLeft = currentValue - totalWidth / 2 + scrollUnit),
          behavior: 'smooth',
        });
      } else {
        techsContainer.current.scrollTo({
          left: techsContainer.current.scrollLeft + scrollUnit,
          behavior: 'smooth',
        });
      }
    } else {
      if (currentValue - scrollUnit < scrollUnit) {
        techsContainer.current.scrollTo({
          left: (techsContainer.current.scrollLeft = currentValue - totalWidth / 2),
          behavior: 'auto',
        });
        techsContainer.current.scrollTo({
          left: (techsContainer.current.scrollLeft =
            totalWidth / 2 + Math.abs(currentValue - scrollUnit)),
          behavior: 'smooth',
        });
      } else {
        techsContainer.current.scrollTo({
          left: techsContainer.current.scrollLeft - scrollUnit,
          behavior: 'smooth',
        });
      }
    }
  }
  return (
    <section className={styles.infoAndTechs}>
      <div className={styles.personalInfo}>
        <h2 className={styles.personalInfoTitle}>I'm a web developer</h2>
        {user ? <p className={styles.aboutMe}>{user.aboutMe}</p> : loading}
      </div>
      <div>
        <p className={styles.techsTitle}>Some technologies i'm familiar with</p>
        <div ref={techsContainer} onWheel={(e) => onWheel(e)} className={styles.techsContainer}>
          {techs
            ? techs.map((tech) => (
                <div ref={techImg} key={tech.id} className={styles.techContainer}>
                  <div className={styles.techImageContainer}>
                    <img
                      className={styles.techImg}
                      src={tech.techImg}
                      alt={`${tech.techName} logo`}
                    />
                  </div>
                </div>
              ))
            : loading}
          {techs
            ? techs.map((tech, i) => (
                <div ref={techImg} key={i} className={styles.techContainer}>
                  <div className={styles.techImageContainer}>
                    <img
                      className={styles.techImg}
                      src={tech.techImg}
                      alt={`${tech.techName} logo`}
                    />
                  </div>
                </div>
              ))
            : loading}
        </div>
      </div>
    </section>
  );
}
