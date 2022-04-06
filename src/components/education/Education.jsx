import React, { useContext, useEffect, useState } from 'react';
import EducationItem from './EducationItem';
import { InfoContext } from 'App';
import styles from './Education.module.css';
import EducationForm from 'components/forms/education/EducationForm';
import Button from 'components/button/Button';
import LoadingIcon from 'components/loading-icon/LoadingIcon';
export default function Education() {
  const education = useContext(InfoContext).education;
  const loggedIn = useContext(InfoContext).loggedIn;

  const [showNewForm, setShowNewForm] = useState(false);

  useEffect(() => {
    if (!loggedIn) {
      setShowNewForm(false);
    }
  }, [loggedIn]);
  return (
    <section className={styles.educationSection}>
      <div className={styles.titleContainer}>
        <p className={`${styles.title} textShadowLight`}>My studies</p>
      </div>
      <div className={styles.education}>
        {education ? (
          education.map((e, i) => <EducationItem e={e} i={i} key={e.id ? e.id : i} />)
        ) : (
          <LoadingIcon />
        )}
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
