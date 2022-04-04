import { InfoContext } from 'App';
import Button from 'components/button/Button';
import { adminApi } from 'index';
import React, { useContext, useRef } from 'react';
import styles from './ExperienceForm.module.css';

export default function ExperienceForm({
  e = { title: '', description: '', startDate: '', endDate: '', experienceImg: '' },
  i,
  hideForm,
}) {
  const experiences = useContext(InfoContext).experiences;
  const setExperiences = useContext(InfoContext).setExperiences;

  const title = useRef('');
  const description = useRef('');
  const startDate = useRef('');
  const endDate = useRef('');
  const experienceImg = useRef('');

  async function submitHandler(event) {
    event.preventDefault();
    const newExperience = {
      ...e,
      title: title.current.value,
      description: description.current.value,
      startDate: startDate.current.value,
      endDate: endDate.current.value,
      experienceImg: experienceImg.current.value,
    };
    if (!!e.id) {
      await adminApi.put('/experience', newExperience);
      experiences[i] = newExperience;
      hideForm();
    } else {
      const generatedId = await adminApi.post('/experiences', newExperience);
      newExperience.id = generatedId;
      experiences.push(newExperience);
      experiences.sort((a, b) => a.title > b.title);
      title.current.value = '';
      description.current.value = '';
      startDate.current.value = '';
      endDate.current.value = '';
      experienceImg.current.value = '';
    }
    const newExperienceList = [...experiences];
    setExperiences(newExperienceList);
  }
  return (
    <form onSubmit={submitHandler} className={styles.experienceForm}>
      <div className={styles.experienceInputs}>
        <div className={styles.inputLabel}>
          <label className={styles.experienceLabel} htmlFor='title'>
            Degree
          </label>
          <input
            defaultValue={e.title}
            className={styles.experienceInput}
            ref={title}
            name='title'
            id='title'
          />
        </div>
        <div className={styles.inputLabel}>
          <label className={styles.experienceLabel} htmlFor='description'>
            School
          </label>
          <input
            defaultValue={e.description}
            className={styles.experienceInput}
            ref={description}
            name='description'
            id='description'
          />
        </div>
        <div className={styles.inputLabel}>
          <label className={styles.experienceLabel} htmlFor='startDate'>
            Start date
          </label>
          <input
            defaultValue={e.startDate}
            className={styles.experienceInput}
            ref={startDate}
            name='startDate'
            id='startDate'
          />
        </div>
        <div className={styles.inputLabel}>
          <label className={styles.experienceLabel} htmlFor='endDate'>
            End date
          </label>
          <input
            defaultValue={e.endDate}
            className={styles.experienceInput}
            ref={endDate}
            name='endDate'
            id='endDate'
          />
        </div>
        <div className={styles.inputLabel}>
          <label className={styles.experienceLabel} htmlFor='experienceImg'>
            Experience image path
          </label>
          <input
            defaultValue={e.experienceImg}
            className={styles.experienceInput}
            ref={experienceImg}
            name='experienceImg'
            id='experienceImg'
          />
        </div>
      </div>
      <div>
        <Button onClick={(e) => submitHandler(e)}>Save</Button>
      </div>
    </form>
  );
}
