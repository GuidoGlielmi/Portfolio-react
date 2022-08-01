import {useContext, useState} from 'react';
import {userContext} from 'components/contexts/user/UserContext';
import CloseAndEdit from 'components/close-icon/CloseAndEdit';
import SkillForm from 'components/forms/skills/SkillForm';
import ProgressRing from './ProgressRing';
import styles from './SkillItem.module.css';

export default function SkillItem({skill, setSkills}) {
  const {loggedIn, makeRequest} = useContext(userContext);

  const [showForm, setShowForm] = useState(false);

  async function deleteSkill() {
    try {
      await makeRequest({url: `skills/${skill.id}`, method: 'delete'});
      setSkills(ps => ps.filter(s => s.skill !== skill.id));
    } catch (err) {
      console.log(err);
    }
  }

  async function updateSkill(newSkill) {
    try {
      await makeRequest({url: `skills/${skill.id}`, body: newSkill, method: 'put'});
      setSkills(ps => ps.filter(s => s.skill !== skill.id));
      setShowForm(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.skillContainer}>
      {loggedIn && (
        <CloseAndEdit toggleEdit={() => setShowForm(ps => !ps)} deleteItem={deleteSkill} />
      )}
      {showForm ? (
        <SkillForm skill={skill} handleSubmit={updateSkill} />
      ) : (
        <div className={styles.skill}>
          <p className={styles.skillName}>{skill.name}</p>
          <ProgressRing percentage={skill.abilityPercentage} />
        </div>
      )}
    </div>
  );
}
