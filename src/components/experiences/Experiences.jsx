import React, { useContext } from 'react';
import { InfoContext } from 'App';
import styles from './Experiences.module.css';
import ExperienceItem from './ExperienceItem';
export default function Experiences() {
  const experiences = useContext(InfoContext).experiences;
  const loggedIn = true;
  // const loggedIn = useContext(InfoContext).loggedIn;
  const loading = 'loading...';
  return (
    <section className={styles.experiencesSection}>
      <div className={styles.titleContainer}>
        <p className={styles.title}>My Experiences</p>
      </div>
      <div className={styles.experiences}>
        {experiences
          ? experiences.map((e, i) => (
              <ExperienceItem
                e={e}
                i={i}
                isLastItem={i === experiences.length - 1 ? true : false}
              />
            ))
          : loading}
      </div>
    </section>
  );
}
