import { InfoContext } from 'App';
import Button from 'components/button/Button';
import { adminApi } from 'index';
import React, { useContext, useRef } from 'react';
import styles from './EducationForm.module.css';

export default function EducationForm({
  e = { degree: '', school: '', startDate: '', endDate: '', educationImg: '' },
  i,
  hideForm,
}) {
  const education = useContext(InfoContext).education;
  const setEducation = useContext(InfoContext).setEducation;

  const degree = useRef('');
  const school = useRef('');
  const startDate = useRef('');
  const endDate = useRef('');
  const educationImg = useRef('');

  async function submitHandler(event) {
    event.preventDefault();
    const newEducation = {
      ...e,
      degree: degree.current.value,
      school: school.current.value,
      startDate: startDate.current.value,
      endDate: endDate.current.value,
      educationImg: educationImg.current.value,
    };
    if (!!e.id) {
      await adminApi.put('/education', newEducation);
      education[i] = newEducation;
      hideForm();
    } else {
      const generatedId = await adminApi.post('/education', newEducation);
      newEducation.id = generatedId;
      education.push(newEducation);
      education.sort((a, b) => a.degree > b.degree);
      degree.current.value = '';
      school.current.value = '';
      startDate.current.value = '';
      endDate.current.value = '';
      educationImg.current.value = '';
    }
    setEducation([...education]);
  }
  return (
    <form onSubmit={submitHandler} className={styles.educationForm}>
      <div className={styles.educationInputs}>
        <div className={styles.inputLabel}>
          <label className={styles.educationLabel} htmlFor='degree'>
            Degree
          </label>
          <input
            defaultValue={e.degree}
            className={styles.educationInput}
            ref={degree}
            name='degree'
            id='degree'
          />
        </div>
        <div className={styles.inputLabel}>
          <label className={styles.educationLabel} htmlFor='school'>
            School
          </label>
          <input
            defaultValue={e.school}
            className={styles.educationInput}
            ref={school}
            name='school'
            id='school'
          />
        </div>
        <div className={styles.inputLabel}>
          <label className={styles.educationLabel} htmlFor='startDate'>
            Start date
          </label>
          <input
            defaultValue={e.startDate}
            className={styles.educationInput}
            ref={startDate}
            name='startDate'
            id='startDate'
          />
        </div>
        <div className={styles.inputLabel}>
          <label className={styles.educationLabel} htmlFor='endDate'>
            End date
          </label>
          <input
            defaultValue={e.endDate}
            className={styles.educationInput}
            ref={endDate}
            name='endDate'
            id='endDate'
          />
        </div>
        <div className={styles.inputLabel}>
          <label className={styles.educationLabel} htmlFor='educationImg'>
            Education image path
          </label>
          <input
            defaultValue={e.educationImg}
            className={styles.educationInput}
            ref={educationImg}
            name='educationImg'
            id='educationImg'
          />
        </div>
      </div>
      <div>
        <Button onClick={(e) => submitHandler(e)}>Save</Button>
      </div>
    </form>
  );
}
