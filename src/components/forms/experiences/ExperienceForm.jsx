import Button from 'components/button/Button';
import React, { useRef } from 'react';
import styles from './ExperienceForm.module.css';

export default function ExperienceForm({ e }) {
  const title = useRef('');
  const description = useRef('');
  const startDate = useRef('');
  const endDate = useRef('');
  const experienceImg = useRef('');
  function submit(e) {
    e.preventDefault();
  }
  return (
    <form onSubmit={submit} className={styles.experienceForm}>
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
        <Button onClick={(e) => submit(e)}>Save</Button>
      </div>
    </form>
  );
}
