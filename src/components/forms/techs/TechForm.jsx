import Button from 'components/button/Button';
import React, { useRef } from 'react';
import styles from './TechForm.module.css';

export default function TechForm({ t }) {
  const name = useRef('');
  const techImg = useRef(0);
  function submit(e) {
    e.preventDefault();
  }
  return (
    <form onSubmit={submit} className={styles.techForm}>
      <div className={styles.techInputs}>
        <div className={styles.inputLabel}>
          <label className={styles.techLabel} htmlFor='name'>
            Name
          </label>
          <input
            defaultValue={t.name}
            className={styles.techInput}
            ref={name}
            name='name'
            id='name'
          />
        </div>
        <div className={styles.inputLabel}>
          <label className={styles.techLabel} htmlFor='techImg'>
            Technology image
          </label>
          <input
            defaultValue={t.techImg}
            className={styles.techInput}
            ref={techImg}
            name='techImg'
            id='techImg'
          />
        </div>
      </div>
      <div>
        <Button onClick={(e) => submit(e)}>Save</Button>
      </div>
    </form>
  );
}
