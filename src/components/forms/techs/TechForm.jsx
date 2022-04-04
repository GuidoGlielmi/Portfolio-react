import { InfoContext } from 'App';
import Button from 'components/button/Button';
import { adminApi } from 'index';
import React, { useContext, useRef } from 'react';
import styles from './TechForm.module.css';

export default function TechForm({ t = { name: '', techImg: '' }, i, hideForm }) {
  const techs = useContext(InfoContext).techs;
  const setTechs = useContext(InfoContext).setTechs;

  const name = useRef(t.name);
  const techImg = useRef(t.techImg);

  async function submitHandler(event) {
    event.preventDefault();
    const newTech = {
      ...t,
      name: name.current.value,
      techImg: techImg.current.value,
    };
    if (!!t.id) {
      await adminApi.put('/techs', newTech);
      techs[i] = newTech;
      hideForm();
    } else {
      const generatedId = await adminApi.post('/techs', newTech);
      newTech.id = generatedId;
      techs.push(newTech);
      techs.sort((a, b) => a.name > b.name);
      name.current.value = '';
      techImg.current.value = '';
    }
    const newTechsList = [...techs];
    setTechs(newTechsList);
  }
  return (
    <form onSubmit={submitHandler} className={styles.techForm}>
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
        <Button onClick={(e) => submitHandler(e)}>Save</Button>
      </div>
    </form>
  );
}
