import React, { useContext, useEffect, useState } from 'react';
import EducationItem from './EducationItem';
import { InfoContext } from 'App';
import styles from './Education.module.css';
import EducationForm from 'components/forms/education/EducationForm';
import Button from 'components/button/Button';
<<<<<<< Updated upstream
import LoadingIcon from 'components/loading-icon/LoadingIcon';
export default function Education() {
  const education = useContext(InfoContext).education;
  const loggedIn = useContext(InfoContext).loggedIn;
=======
import useFetch from 'components/custom-hooks/useFetch';
import fetch from 'services/fetch';
export default function Education() {
  const [loading, educations, setEducations] = useFetch({url: '/education'});
  const {loggedIn} = useContext(InfoContext);
>>>>>>> Stashed changes

  const [showNewForm, setShowNewForm] = useState(false);

  useEffect(() => !loggedIn && setShowNewForm(false), [loggedIn]);
  return (
    <section className={styles.educationSection}>
      <div className={styles.titleContainer}>
        <p className={`${styles.title} textShadowLight`}>My studies</p>
      </div>
      <div className={styles.education}>
<<<<<<< Updated upstream
        {education ? (
          education.map((e, i) => <EducationItem e={e} i={i} key={e.id ? e.id : i} />)
        ) : (
          <LoadingIcon />
        )}
=======
        {loading ||
          educations.map((e, i) => (
            <EducationItem education={e} i={i} key={e.id} setEducations={setEducations} />
          ))}
>>>>>>> Stashed changes
      </div>
      {showNewForm && <EducationForm />}
      {loggedIn && (
        <div onClick={() => setShowNewForm(!showNewForm)} className={styles.addButton}>
          <Button>Add education</Button>
        </div>
      )}
    </section>
  );
}
