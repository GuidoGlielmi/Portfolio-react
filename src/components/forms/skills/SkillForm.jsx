import { InfoContext } from 'App';
import Button from 'components/button/Button';
import { adminApi } from 'index';
import React, { useContext, useRef } from 'react';
import styles from './SkillForm.module.css';

export default function SkillForm({
  s = { name: '', abilityPercentage: 0, type: '' },
  i,
  hideForm,
}) {
  const skills = useContext(InfoContext).skills;
  const setSkills = useContext(InfoContext).setSkills;

  const name = useRef(s.name);
  const abilityPercentage = useRef(s.abilityPercentage);
  const type = useRef(s.type);

  async function submitHandler(event) {
    event.preventDefault();
    const newSkill = {
      ...s,
      name: name.current.value,
      abilityPercentage: abilityPercentage.current.value,
      type: type.current.value,
    };
    if (!!s.id) {
      await adminApi.put('/skills', newSkill);
      skills[i] = newSkill;
      hideForm();
    } else {
      const generatedId = await adminApi.post('/skills', newSkill);
      newSkill.id = generatedId;
      skills.push(newSkill);
      skills.sort((a, b) => a.name > b.name);
      name.current.value = '';
      abilityPercentage.current.value = '';
      type.current.value = '';
    }
    const newSkillList = [...skills];
    setSkills(newSkillList);
  }
  return (
    <form onSubmit={submitHandler} className={styles.skillForm}>
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
        <Button onClick={(e) => submitHandler(e)}>Save</Button>
      </div>
    </form>
  );
}
