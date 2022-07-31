import Button from 'components/button/Button';
import {useRef} from 'react';
import styles from './TechForm.module.css';

const initialTech = {name: '', techImg: ''};
export default function TechForm({techs = initialTech, handleSubmit}) {
  const name = useRef(techs.name);
  const techImg = useRef(techs.techImg);

  async function onSubmit(e) {
    e.preventDefault();
    const newTech = {
      ...techs,
      name: name.current.value,
      techImg: techImg.current.value,
    };
    await handleSubmit(newTech);

    /* if (!!techs.id) {
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
    setTechs([...techs]); */
  }
  return (
    <form onSubmit={onSubmit} className={styles.techForm}>
      <div className={styles.techInputs}>
        <div className={styles.inputLabel}>
          <label className={styles.techLabel} htmlFor='name'>
            Name
          </label>
          <input
            defaultValue={techs.name}
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
            defaultValue={techs.techImg}
            className={styles.techInput}
            ref={techImg}
            name='techImg'
            id='techImg'
          />
        </div>
      </div>
      <div>
        <Button onClick={e => onSubmit(e)}>Save</Button>
      </div>
    </form>
  );
}
