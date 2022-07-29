import {InfoContext} from 'App';
import CloseAndEdit from 'components/close-icon/CloseAndEdit';
import SkillForm from 'components/forms/skills/SkillForm';
import {useContext, useState} from 'react';
import fetch from 'services/fetch';
import ProgressRing from './ProgressRing';
import styles from './SkillItem.module.css';
export default function SkillItem({skill, setSkills}) {
  const [showForm, setShowForm] = useState(false);
  const {loggedIn} = useContext(InfoContext);

  async function deleteSkill() {
    await fetch.delete(`skills/${skill.id}`);
    setSkills(ps => ps.filter(s => s.skill !== skill.id));
  }

  async function updateSkill(newSkill) {
    await fetch.put(`skills/${skill.id}`, newSkill);
    setSkills(ps => ps.filter(s => s.skill !== skill.id));
  }

  return (
    <div className={styles.skillContainer}>
      {loggedIn && (
        <CloseAndEdit toggleEdit={() => setShowForm(ps => !ps)} deleteItem={deleteSkill} />
      )}
      {!showForm ? (
        <div className={styles.skill}>
          <p className={styles.skillName}>{skill.name}</p>
          <ProgressRing percentage={skill.abilityPercentage} />
        </div>
      ) : (
        <SkillForm
          skill={skill}
          hideForm={() => setShowForm(ps => !ps)}
          handleSubmit={updateSkill}
        />
      )}
    </div>
  );
}
