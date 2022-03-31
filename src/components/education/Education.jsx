import React, { useContext } from 'react';
import EducationItem from './EducationItem';
import { InfoContext } from 'App';
import styles from './Education.module.css';
export default function Education() {
  const education = useContext(InfoContext).education;
  const loggedIn = useContext(InfoContext).loggedIn;
  const isLoading = useContext(InfoContext).educationLoading;
  const loading = 'loading...';
  return (
    <section className={styles.educationSection}>
      <div className={styles.titleContainer}>
        <p className={styles.title}>My studies</p>
      </div>
      <div className={styles.education}>
        {education ? education.map((e, i) => <EducationItem e={e} i={i} />) : loading}
      </div>
    </section>
  );
}
