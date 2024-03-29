import Button from 'components/button/Button';
import {useRef} from 'react';
import styles from './TechForm.module.css';

const initialTech = {name: '', techImg: ''};
export default function TechForm({tech = initialTech, handleSubmit}) {
  const name = useRef(tech.name);
  const techImg = useRef(tech.techImg);

  function onSubmit(e) {
    e.preventDefault();
    handleSubmit({
      ...tech,
      name: name.current.value,
      techImg: techImg.current.value,
    });
  }
  return (
    <form onSubmit={onSubmit} className={styles.techForm}>
      <div>
        <div>
          <label htmlFor='name'>Name</label>
          <input defaultValue={tech.name} ref={name} name='name' id='name' />
        </div>
        <div>
          <label htmlFor='techImg'>Technology image</label>
          <input defaultValue={tech.techImg} ref={techImg} name='techImg' id='techImg' />
        </div>
      </div>
      <div>
        <Button onClick={e => onSubmit(e)}>Save</Button>
      </div>
    </form>
  );
}
