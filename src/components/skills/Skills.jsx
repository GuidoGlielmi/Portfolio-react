import React, {useContext, useEffect, useState} from 'react';
import SkillItem from './SkillItem';
import {InfoContext} from 'App';
import styles from './Skills.module.css';
import SkillForm from 'components/forms/skills/SkillForm';
import Button from 'components/button/Button';
import useFetch from 'components/custom-hooks/useFetch';
export default function Skills() {
  const [loading, skills, setSkills] = useFetch({url: '/skills'});
  const [showNewForm, setShowNewForm] = useState(false);
  const {loggedIn} = useContext(InfoContext);
  const groups = skills.reduce((p, c) => ({[c.type]: p[c.type] ? [...p[c.type], c] : [c]}), {});

  useEffect(() => !loggedIn && setShowNewForm(false), [loggedIn]);

  async function addSkill(newSkill) {
    await fetch.post('skills', newSkill);
    setSkills(ps => [...ps, newSkill]);
    setShowNewForm(false);
  }

  return (
    <section className={styles.skillsSection}>
      {loading ||
        Object.entries(groups).map(([title, skills]) => (
          <TypeGroup title={title} skills={skills} key={title} setSkills={setSkills} />
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
    <div className={styles.softAndHard}>
      <div className={styles.titleContainer}>
        <p className={`${styles.title} textShadowLight`}>{title}</p>
      </div>
      <div className={styles.skills}>
        {skills.map((s, i) => (
          <SkillItem s={s} i={i} key={s.id} setSkills={setSkills} />
        ))}
      </div>
    </div>
  );
}
/*
<div className={styles.softAndHard}>
        <div className={styles.titleContainer}>
          <p className={`${styles.title} textShadowLight`}>Soft and Hard Skills</p>
        </div>
        {loading || (
          <div className={styles.skills}>
            {skills.map((s, i) => s.type === 'HardAndSoft' && <SkillItem s={s} i={i} key={s.id} />)}
          </div>
        )}
      </div>
      <div className={styles.languages}>
        <div className={styles.titleContainer}>
          <p className={`${styles.title} textShadowSemiDark`}>Languages</p>
        </div>
        {loading || (
          <div className={styles.skills}>
            {skills.map((s, i) => s.type === 'language' && <SkillItem s={s} i={i} key={s.id} />)}
          </div>
        )}
      </div>
*/
