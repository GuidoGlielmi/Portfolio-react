import Button from 'components/button/Button';
import {useRef} from 'react';
import styles from './SkillForm.module.css';

const initialSkill = {name: '', abilityPercentage: '', type: ''};
export default function SkillForm({skill = initialSkill, handleSubmit}) {
  const name = useRef(skill.name);
  const abilityPercentage = useRef(skill.abilityPercentage);
  const type = useRef(skill.type);

  function onSubmit(e) {
    e.preventDefault();
    handleSubmit({
      ...skill,
      name: name.current.value,
      abilityPercentage: abilityPercentage.current.value,
      type: type.current.value,
    });
  }
  return (
    <form onSubmit={onSubmit} className={styles.skillForm}>
      <div>
        <div>
          <label htmlFor='name'>Name</label>
          <input defaultValue={skill.name} ref={name} name='name' id='name' />
        </div>
        <div>
          <label htmlFor='abilityPercentage'>Ability percentage</label>
          <input
            defaultValue={skill.abilityPercentage}
            ref={abilityPercentage}
            name='abilityPercentage'
            id='abilityPercentage'
          />
        </div>
        <div>
          <label htmlFor='type'>Type</label>
          <input defaultValue={skill.type} ref={type} name='type' id='type' />
        </div>
      </div>
      <div>
        <Button>Save</Button>
      </div>
    </form>
  );
}
