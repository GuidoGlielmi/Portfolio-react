import React, { useContext, useEffect, useState } from 'react';
import { InfoContext } from 'App';
import styles from './Experiences.module.css';
import ExperienceItem from './ExperienceItem';
import ExperienceForm from 'components/forms/experiences/ExperienceForm';
import Button from 'components/button/Button';
export default function Experiences() {
  const experiences = useContext(InfoContext).experiences;
  const [showNewForm, setShowNewForm] = useState(false);
  const loggedIn = useContext(InfoContext).loggedIn;
  const loading = 'loading...';
  useEffect(() => {
    if (!loggedIn) {
      setShowNewForm(false);
    }
  }, [loggedIn]);
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
                key={e.id}
              />
            ))
          : loading}
      </div>
      {showNewForm && <ExperienceForm />}
      {loggedIn && (
        <div onClick={() => setShowNewForm(!showNewForm)} className={styles.addButton}>
          <Button>Add experience</Button>
        </div>
      )}
    </section>
  );
}
