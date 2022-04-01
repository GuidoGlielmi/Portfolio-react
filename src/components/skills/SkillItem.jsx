import CloseAndEdit from 'components/close-icon/CloseAndEdit';
import SkillForm from 'components/forms/skills/SkillForm';
import { useState } from 'react';
import ProgressRing from './ProgressRing';
import styles from './SkillItem.module.css';
export default function SkillItem({ s, i }) {
  const [showForm, setShowForm] = useState(false);
  let loggedIn = true;
  /*   const name = useRef('');
  const abilityPercentage = useRef(0);
  const type = useRef('');
  function submit() {
    const skill = {
      name,
      abilityPercentage,
      type,
    };
    fetch('asd', skill);
  } */
  return (
    <div>
      {loggedIn && <CloseAndEdit toggleEdit={() => setShowForm(!showForm)} />}
      {!showForm ? (
        <div className={styles.skill}>
          <p className={styles.skillName}>{s.name}</p>
          <ProgressRing percentage={s.abilityPercentage} />
        </div>
      ) : (
        <SkillForm s={s} />
      )}
    </div>
  );
}
