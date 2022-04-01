import Button from 'components/button/Button';
import React, { useRef } from 'react';
import styles from './SkillForm.module.css';

export default function SkillForm({ s }) {
  const name = useRef('');
  const abilityPercentage = useRef(0);
  const type = useRef('');
  function submit(e) {
    e.preventDefault();
  }
  return (
    <form onSubmit={submit} className={styles.skillForm}>
      <div className={styles.skillInputs}>
        <div className={styles.inputLabel}>
          <label className={styles.skillLabel} htmlFor='name'>
            Name
          </label>
          <input
            defaultValue={s.name}
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
            defaultValue={s.abilityPercentage}
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
            defaultValue={s.type}
            className={styles.skillInput}
            ref={type}
            name='type'
            id='type'
          />
        </div>
      </div>
      <div>
        <Button onClick={(e) => submit(e)}>Save</Button>
      </div>
    </form>
  );
}
