import ProgressRing from './ProgressRing';
import styles from './SkillItem.module.css';
export default function SkillItem({ s, i }) {
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
    <div className={styles.skill}>
      <p className={styles.skillName}>{s.name}</p>
      <ProgressRing percentage={s.abilityPercentage} />
    </div>
  );
}
/*  <form onSubmit={() => submit()}>
          <input value={s.name} />
          <input value={s.abilityPercentage} />
          <input value={s.type} />
        </form> */
