import React from 'react';
import styles from './EducationItem.module.css';

export default function EducationItem({ e, i }) {
  return (
    <div
      className={`${styles.educationContainer} ${
        i % 2 === 0 ? styles.educationContainerRight : styles.educationContainerLeft
      }`}
    >
      <div className={i % 2 === 0 ? styles.educationRight : styles.educationLeft}>
        <div className={styles.educationImgContainer}>
          <img className={styles.educationImg} src={e.educationImg} alt={`${e.school} logo`} />
        </div>
        <div className={styles.educationInfoContainer}>
          <h3 className={styles.educationDegree}>{e.degree}</h3>
          <p className={styles.educationSchool}>{e.school}</p>
          <p className={styles.educationSchool}>{e.startDate}</p>
          <p className={styles.educationSchool}>{e.endDate}</p>
        </div>
      </div>
    </div>
  );
}
