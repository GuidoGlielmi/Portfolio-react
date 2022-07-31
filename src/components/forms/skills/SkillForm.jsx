import Button from 'components/button/Button';
import {useRef} from 'react';
import styles from './SkillForm.module.css';

const initialSkill = {name: '', abilityPercentage: 0, type: ''};
export default function SkillForm({skill = initialSkill, handleSubmit}) {
  const name = useRef(skill.name);
  const abilityPercentage = useRef(skill.abilityPercentage);
  const type = useRef(skill.type);

  function onSubmit(e) {
    e.preventDefault();
    const newSkill = {
      ...skill,
      name: name.current.value,
      abilityPercentage: abilityPercentage.current.value,
      type: type.current.value,
    };
    handleSubmit(newSkill);
  }
  return (
    <form onSubmit={onSubmit} className={styles.skillForm}>
      <div className={styles.skillInputs}>
        <div className={styles.inputLabel}>
          <label className={styles.skillLabel} htmlFor='name'>
            Name
          </label>
          <input
            defaultValue={skill.name}
            className={styles.skillInput}
            ref={name}
            name='name'
            id='name'
          />
        </div>
        <div className={styles.inputLabel}>
          <label className={styles.skillLabel} htmlFor='abilityPercentage'>
            Ability percentage
          </label>
          <input
            defaultValue={skill.abilityPercentage}
            className={styles.skillInput}
            ref={abilityPercentage}
            name='abilityPercentage'
            id='abilityPercentage'
          />
        </div>
        <div className={styles.inputLabel}>
          <label className={styles.skillLabel} htmlFor='type'>
            Type
          </label>
          <input
            defaultValue={skill.type}
            className={styles.skillInput}
            ref={type}
            name='type'
            id='type'
          />
        </div>
      </div>
      <div>
        <Button>Save</Button>
      </div>
    </form>
  );
}
