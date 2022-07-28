import React, {useContext, useEffect, useState} from 'react';
import EducationItem from './EducationItem';
import {InfoContext} from 'App';
import styles from './Education.module.css';
import EducationForm from 'components/forms/education/EducationForm';
import Button from 'components/button/Button';
import useFetch from 'components/custom-hooks/useFetch';
export default function Education() {
  const [loading, educations, setEducations] = useFetch({url: '/education'});
  const {loggedIn} = useContext(InfoContext);

  const [showNewForm, setShowNewForm] = useState(false);

  useEffect(() => !loggedIn && setShowNewForm(false), [loggedIn]);

  const toggleNewForm = () => setShowNewForm(ps => !ps);

  async function addEducation(newEducation) {
    const addedEducationId = await fetch.post('education', newEducation);
    newEducation.id = addedEducationId;
    setEducations([...educations, newEducation].sort((a, b) => a.degree > b.degree));
    setShowNewForm(false);
  }

  return (
    <section className={styles.educationSection}>
      <div className={styles.titleContainer}>
        <p className={`${styles.title} textShadowLight`}>My studies</p>
      </div>
      <div className={styles.education}>
        {loading ||
          educations.map((e, i) => (
            <EducationItem education={e} i={i} key={e.id} setEducations={setEducations} />
          ))}
      </div>
      {showNewForm && <EducationForm handleSubmit={addEducation} />}
      {loggedIn && (
        <div onClick={toggleNewForm} className={styles.addButton}>
          <Button>Add education</Button>
        </div>
      )}
    </section>
  );
}
