import {InfoContext} from 'App';
import CloseAndEdit from 'components/close-icon/CloseAndEdit';
import ExperienceForm from 'components/forms/experiences/ExperienceForm';
import React, {useContext, useState} from 'react';
import styles from './ExperienceItem.module.css';
import fetch from 'services/fetch';

export default function ExperienceItem({experience, i, isLastItem, setExperiences}) {
  const {loggedIn} = useContext(InfoContext);

  const [showForm, setShowForm] = useState(false);

  if (!loggedIn && showForm) setShowForm(false);

  async function deleteExperience() {
    await fetch.delete(`experiences/${experience.id}`);
    setExperiences(pe => pe.filter(({id}) => id !== experience.id));
  }

  async function updateExperience(newExperience) {
    await fetch.put('experiences', newExperience);
    setExperiences(pe => pe.map(e => (e.id === experience.id ? newExperience : e)));
    setShowForm(false);
  }

  return i % 2 === 0 ? (
    <div className={!isLastItem ? styles.experienceSectionRight : styles.lastSection}>
      <div className={styles.experienceContainerRight}>
        <div className={styles.experiencePadding}>
          <div className={styles.experienceRight}>
            {loggedIn && (
              <CloseAndEdit
                toggleEdit={() => setShowForm(ps => !ps)}
                deleteItem={deleteExperience}
              />
            )}
            <div className={styles.experienceImgContainer}>
              <img
                className={styles.experienceImg}
                src={experience.experienceImg}
                alt={`${experience.title} logo`}
              />
            </div>
            {!showForm ? (
              <div className={styles.experienceInfoContainerRight}>
                <h3 className={styles.experienceTitle}>{experience.title}</h3>
                <div className={styles.dates}>
                  <span>{experience.startDate} - </span>
                  <span>{experience.endDate}</span>
                </div>
                <p className={styles.experienceDescription}>{experience.description}</p>
                {experience.certificate && (
                  <a href={experience.certificate} target='_blank' rel='noreferrer'>
                    Certificate
                  </a>
                )}
              </div>
            ) : (
              <ExperienceForm experience={experience} handleSubmit={updateExperience} />
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
              <img
                className={styles.experienceImg}
                src={experience.experienceImg}
                alt={`${experience.title} logo`}
              />
            </div>
            {!showForm ? (
              <div className={styles.experienceInfoContainerLeft}>
                <h3 className={styles.experienceTitle}>{experience.title}</h3>
                <div className={styles.dates}>
                  <span>{experience.startDate} - </span>
                  <span>{experience.endDate}</span>
                </div>
                <p className={styles.experienceDescription}>{experience.description}</p>
                {experience.certificate && (
                  <a href={experience.certificate} target='_blank' rel='noreferrer'>
                    Certificate
                  </a>
                )}
              </div>
            ) : (
              <ExperienceForm experience={experience} handleSubmit={updateExperience} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
