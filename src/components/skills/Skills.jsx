import {useContext, useEffect, useState} from 'react';
import {loginContext} from 'components/contexts/login/LoginContext';
import {userFeedbackContext} from 'components/contexts/user-feedback/UserFeedbackContext';
import {userContext} from 'components/contexts/user/UserContext';
import SkillForm from 'components/forms/skills/SkillForm';
import Button from 'components/button/Button';
import SkillItem from './SkillItem';
import styles from './Skills.module.css';

export default function Skills() {
  const {makeRequest} = useContext(userFeedbackContext);
  const {loggedIn} = useContext(loginContext);
  const {loadingSkills: loading, skills, setSkills} = useContext(userContext);
  const [showNewForm, setShowNewForm] = useState(false);

  const groups = skills?.reduce(
    (p, c) => ({...p, [c.type]: p[c.type] ? [...p[c.type], c] : [c]}),
    {},
  );

  useEffect(() => !loggedIn && setShowNewForm(false), [loggedIn]);

  async function addSkill(newSkill) {
    try {
      await makeRequest(
        {url: 'skills', body: newSkill, method: 'post'},
        'Skill added successfully',
      );
      setSkills(ps => [...ps, newSkill]);
      setShowNewForm(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className={styles.skillsSection}>
      {loading ||
        Object.entries(groups).map(([title, skills]) => (
          <TypeGroup title={title} skills={skills} setSkills={setSkills} key={title} />
        ))}
      {showNewForm && <SkillForm handleSubmit={addSkill} />}
      {loggedIn && (
        <div onClick={() => setShowNewForm(!showNewForm)} className={styles.addButton}>
          <Button>Add skill</Button>
        </div>
      )}
    </section>
  );
}

function TypeGroup({title, skills, setSkills}) {
  return (
    <div className={styles.group}>
      <h2>{title}</h2>
      <div className={styles.skills}>
        {skills.map(s => (
          <SkillItem skill={s} key={s.id} setSkills={setSkills} />
        ))}
      </div>
    </div>
  );
}
