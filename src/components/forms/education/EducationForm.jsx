import Button from 'components/button/Button';
import React, {useRef} from 'react';
import styles from './EducationForm.module.css';
const initialState = {degree: '', school: '', startDate: '', endDate: '', educationImg: ''};
export default function EducationForm({education = initialState, handleSubmit}) {
  const degree = useRef(education.degree);
  const school = useRef(education.school);
  const startDate = useRef(education.startDate);
  const endDate = useRef(education.endDate);
  const educationImg = useRef(education.educationImg);

  async function onSubmit(e) {
    e.preventDefault();
    await handleSubmit({
      degree: degree.current.value,
      school: school.current.value,
      startDate: startDate.current.value,
      endDate: endDate.current.value,
      educationImg: educationImg.current.value,
    });
    degree.current.value = '';
    school.current.value = '';
    startDate.current.value = '';
    endDate.current.value = '';
    educationImg.current.value = '';
  }

  return (
    <form onSubmit={onSubmit} className={styles.educationForm}>
      <div className={styles.educationInputs}>
        <div className={styles.inputLabel}>
          <label className={styles.educationLabel} htmlFor='degree'>
            Degree
          </label>
          <input
            defaultValue={degree.current}
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
            defaultValue={school.current}
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
            defaultValue={startDate.current}
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
            defaultValue={endDate.current}
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
            defaultValue={educationImg.current}
            className={styles.educationInput}
            ref={educationImg}
            name='educationImg'
            id='educationImg'
          />
        </div>
      </div>
      <div>
        <Button onClick={e => onSubmit(e)}>Save</Button>
      </div>
    </form>
  );
}
