import { InfoContext } from 'App';
import CloseAndEdit from 'components/close-icon/CloseAndEdit';
import SkillForm from 'components/forms/skills/SkillForm';
import { adminApi } from 'index';
import { useContext, useState } from 'react';
import ProgressRing from './ProgressRing';
import styles from './SkillItem.module.css';
export default function SkillItem({ s, i }) {
  const [showForm, setShowForm] = useState(false);
  const loggedIn = useContext(InfoContext).loggedIn;
  const skills = useContext(InfoContext).skills;
  const setSkill = useContext(InfoContext).setSkills;
  async function deleteSkill() {
    await adminApi.delete(`/skills/${s.id}`);
    skills.splice(i, 1);
    const newSkill = [...skills];
    setSkill(newSkill);
  }
  return (
    <div>
      {loggedIn && (
        <CloseAndEdit toggleEdit={() => setShowForm(!showForm)} deleteItem={deleteSkill} />
      )}
      {!showForm ? (
        <div className={styles.skill}>
          <p className={styles.skillName}>{s.name}</p>
          <ProgressRing percentage={s.abilityPercentage} />
        </div>
      ) : (
        <SkillForm s={s} i={i} hideForm={() => setShowForm(!showForm)} />
      )}
    </div>
  );
}
