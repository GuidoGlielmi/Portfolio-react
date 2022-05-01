import { InfoContext } from 'App';
import CloseAndEdit from 'components/close-icon/CloseAndEdit';
import EducationForm from 'components/forms/education/EducationForm';
import { adminApi } from 'index';
import React, { useContext, useEffect, useState } from 'react';
import styles from './EducationItem.module.css';

export default function EducationItem({ e, i }) {
  const loggedIn = useContext(InfoContext).loggedIn;
  const education = useContext(InfoContext).education;
  const setEducation = useContext(InfoContext).setEducation;

  const [showForm, setShowForm] = useState(false);

  useEffect(() => !loggedIn && setShowForm(false), [loggedIn]);
  async function deleteEducation() {
    await adminApi.delete(`/education/${e.id}`);
    education.splice(i, 1);
    setEducation([...education]);
  }
  return (
    <div
      className={`${styles.educationContainer} ${
        i % 2 === 0 ? styles.educationContainerRight : styles.educationContainerLeft
      }`}
    >
      {loggedIn && (
        <CloseAndEdit toggleEdit={() => setShowForm(!showForm)} deleteItem={deleteEducation} />
      )}
      {!showForm ? (
        <div className={i % 2 === 0 ? styles.educationRight : styles.educationLeft}>
          <div className={styles.educationImgContainer}>
            <img className={styles.educationImg} src={e.educationImg} alt={`${e.school} logo`} />
          </div>
          <div className={styles.educationInfoContainer}>
            <h3 className={styles.educationDegree}>{e.degree}</h3>
            <p className={styles.educationP}>{e.school}</p>
            <p className={styles.educationP}>{e.startDate}</p>
            <p className={styles.educationP}>{e.endDate}</p>
          </div>
        </div>
      ) : (
        <EducationForm e={e} i={i} hideForm={() => setShowForm(!showForm)} />
      )}
    </div>
  );
}
