import React, { useContext, useState } from 'react';
import SkillItem from './SkillItem';
import { InfoContext } from 'App';
import styles from './Skills.module.css';
import SkillForm from 'components/forms/skills/SkillForm';
import Button from 'components/button/Button';
export default function Skills() {
  const skills = useContext(InfoContext).skills;
  const [showNewForm, setShowNewForm] = useState(false);
  const loggedIn = useContext(InfoContext).loggedIn;
  const loading = 'loading...';
  return (
    <section className={styles.skillsSection}>
      <div className={styles.softAndHard}>
        <div className={styles.titleContainer}>
          <p className={styles.title}>Soft and Hard Skills</p>
        </div>
        {skills ? (
          <div className={styles.skills}>
            {skills.map((s, i) => s.type === 'HardAndSoft' && <SkillItem s={s} i={i} />)}
          </div>
        ) : (
          loading
        )}
      </div>
      <div className={styles.languages}>
        <div className={styles.titleContainer}>
          <p className={styles.title}>Languages</p>
        </div>
        {skills ? (
          <div className={styles.skills}>
            {skills.map((s, i) => s.type === 'language' && <SkillItem s={s} i={i} />)}
          </div>
        ) : (
          loading
        )}
      </div>
      {showNewForm && <SkillForm />}
      {loggedIn && (
        <div onClick={() => setShowNewForm(!showNewForm)} className={styles.addButton}>
          <Button>Add skill</Button>
        </div>
      )}
    </section>
  );
}
