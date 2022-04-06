import React, { useContext, useEffect, useState } from 'react';
import SkillItem from './SkillItem';
import { InfoContext } from 'App';
import styles from './Skills.module.css';
import SkillForm from 'components/forms/skills/SkillForm';
import Button from 'components/button/Button';
import LoadingIcon from 'components/loading-icon/LoadingIcon';
export default function Skills() {
  const skills = useContext(InfoContext).skills;
  const [showNewForm, setShowNewForm] = useState(false);
  const loggedIn = useContext(InfoContext).loggedIn;
  useEffect(() => !loggedIn && setShowNewForm(false), [loggedIn]);
  return (
    <section className={styles.skillsSection}>
      <div className={styles.softAndHard}>
        <div className={styles.titleContainer}>
          <p className={`${styles.title} textShadowLight`}>Soft and Hard Skills</p>
        </div>
        {skills ? (
          <div className={styles.skills}>
            {skills.map((s, i) => s.type === 'HardAndSoft' && <SkillItem s={s} i={i} key={s.id} />)}
          </div>
        ) : (
          <LoadingIcon />
        )}
      </div>
      <div className={styles.languages}>
        <div className={styles.titleContainer}>
          <p className={`${styles.title} textShadowSemiDark`}>Languages</p>
        </div>
        {skills ? (
          <div className={styles.skills}>
            {skills.map((s, i) => s.type === 'language' && <SkillItem s={s} i={i} key={s.id} />)}
          </div>
        ) : (
          <LoadingIcon />
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
