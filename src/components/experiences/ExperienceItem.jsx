import CloseAndEdit from 'components/close-icon/CloseAndEdit';
import ExperienceForm from 'components/forms/experiences/ExperienceForm';
import React, { useState } from 'react';
import styles from './ExperienceItem.module.css';

export default function ExperienceItem({ e, i, isLastItem }) {
  const [showForm, setShowForm] = useState(false);
  const loggedIn = true;
  return i % 2 === 0 ? (
    <div className={!isLastItem ? styles.experienceSectionRight : styles.lastSection}>
      <div className={styles.experienceContainerRight}>
        <div className={styles.experiencePadding}>
          <div className={styles.experienceRight}>
            {loggedIn && <CloseAndEdit toggleEdit={() => setShowForm(!showForm)} />}
            <div className={styles.experienceImgContainer}>
              <img className={styles.experienceImg} src={e.experienceImg} alt={`${e.title} logo`} />
            </div>
            {!showForm ? (
              <div className={styles.experienceInfoContainerRight}>
                <h3 className={styles.experienceTitle}>{e.title}</h3>
                <div className={styles.dates}>
                  <span>{e.startDate} -</span>
                  <span>{e.endDate}</span>
                </div>
                <p className={styles.experienceDescription}>{e.description}</p>
                {e.certificate ? (
                  <a href={e.certificate} target='_blank' rel='noreferrer'>
                    Certificate
                  </a>
                ) : (
                  ''
                )}
              </div>
            ) : (
              <ExperienceForm e={e} />
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={!isLastItem ? styles.experienceSectionLeft : styles.lastSection}>
      <div className={styles.experienceContainerLeft}>
        <div className={styles.experiencePadding}>
          <div className={styles.experienceLeft}>
            {loggedIn && <CloseAndEdit toggleEdit={() => setShowForm(!showForm)} />}
            <div className={styles.experienceImgContainer}>
              <img className={styles.experienceImg} src={e.experienceImg} alt={`${e.title} logo`} />
            </div>
            {!showForm ? (
              <div className={styles.experienceInfoContainerLeft}>
                <h3 className={styles.experienceTitle}>{e.title}</h3>
                <div className={styles.dates}>
                  <span>{e.startDate} -</span>
                  <span>{e.endDate}</span>
                </div>
                <p className={styles.experienceDescription}>{e.description}</p>
                {e.certificate ? (
                  <a href={e.certificate} target='_blank' rel='noreferrer'>
                    Certificate
                  </a>
                ) : (
                  ''
                )}
              </div>
            ) : (
              <ExperienceForm e={e} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
