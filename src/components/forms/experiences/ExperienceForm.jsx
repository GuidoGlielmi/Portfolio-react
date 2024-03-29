import Button from 'components/button/Button';
import {useRef} from 'react';
import styles from './ExperienceForm.module.css';

const initialState = {title: '', description: '', startDate: '', endDate: '', experienceImg: ''};
export default function ExperienceForm({experience = initialState, handleSubmit}) {
  const title = useRef(experience.title);
  const description = useRef(experience.description);
  const startDate = useRef(experience.startDate);
  const endDate = useRef(experience.endDate);
  const experienceImg = useRef(experience.experienceImg);

  function onSubmit(e) {
    e.preventDefault();
    handleSubmit({
      ...experience,
      title: title.current.value,
      description: description.current.value,
      startDate: startDate.current.value,
      endDate: endDate.current.value,
      experienceImg: experienceImg.current.value,
    });
  }
  return (
    <form onSubmit={onSubmit} className={styles.experienceForm}>
      <div className={styles.experienceInputs}>
        <div className={styles.inputContainer}>
          <label /* className={styles.experienceLabel} */ htmlFor='title'>Degree</label>
          <input
            defaultValue={experience.title}
            /* className={styles.experienceInput} */
            ref={title}
            name='title'
            id='title'
          />
        </div>
        <div className={styles.inputContainer}>
          <label /* className={styles.experienceLabel} */ htmlFor='description'>School</label>
          <input
            defaultValue={experience.description}
            /* className={styles.experienceInput} */
            ref={description}
            name='description'
            id='description'
          />
        </div>
        <div className={styles.inputContainer}>
          <label /* className={styles.experienceLabel} */ htmlFor='startDate'>Start date</label>
          <input
            defaultValue={experience.startDate}
            /* className={styles.experienceInput} */
            ref={startDate}
            name='startDate'
            id='startDate'
          />
        </div>
        <div className={styles.inputContainer}>
          <label /* className={styles.experienceLabel} */ htmlFor='endDate'>End date</label>
          <input
            defaultValue={experience.endDate}
            /* className={styles.experienceInput} */
            ref={endDate}
            name='endDate'
            id='endDate'
          />
        </div>
        <div className={styles.inputContainer}>
          <label /* className={styles.experienceLabel} */ htmlFor='experienceImg'>
            Experience image path
          </label>
          <input
            defaultValue={experience.experienceImg}
            /* className={styles.experienceInput} */
            ref={experienceImg}
            name='experienceImg'
            id='experienceImg'
          />
        </div>
      </div>
      <div>
        <Button>Save</Button>
      </div>
    </form>
  );
}
