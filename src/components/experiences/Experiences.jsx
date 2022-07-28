import React, {useContext, useEffect, useState} from 'react';
import {InfoContext} from 'App';
import styles from './Experiences.module.css';
import ExperienceItem from './ExperienceItem';
import ExperienceForm from 'components/forms/experiences/ExperienceForm';
import Button from 'components/button/Button';
import useFetch from 'components/custom-hooks/useFetch';
export default function Experiences() {
  const [loading, experiences, setExperiences] = useFetch({url: '/experiences'});

  const {loggedIn} = useContext(InfoContext);

  const [showNewForm, setShowNewForm] = useState(false);

  useEffect(() => !loggedIn && setShowNewForm(false), [loggedIn]);

  const toggleNewForm = () => setShowNewForm(ps => !ps);

  async function addExperience(newExperience) {
    const addedExperienceId = await fetch.post('experiences', newExperience);
    newExperience.id = addedExperienceId;
    setExperiences([...experiences, newExperience].sort((a, b) => a.title > b.title));
    setShowNewForm(false);
  }

  return (
    <section className={styles.experiencesSection}>
      <div className={styles.titleContainer}>
        <p className={`${styles.title} textShadowLight`}>My Experiences</p>
      </div>
      <div className={styles.experiences}>
        {loading ||
          experiences.map((e, i) => (
            <ExperienceItem
              e={e}
              i={i}
              isLastItem={i === experiences.length - 1 ? true : false}
              key={e.id}
              setExperiences={setExperiences}
            />
          ))}
      </div>
      {showNewForm && <ExperienceForm handleSubmit={addExperience} />}
      {loggedIn && (
        <div onClick={toggleNewForm} className={styles.addButton}>
          <Button>Add experience</Button>
        </div>
      )}
    </section>
  );
}
