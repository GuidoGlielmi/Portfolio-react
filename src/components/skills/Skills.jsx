import React, { useContext } from 'react';
import SkillItem from './SkillItem';
import { InfoContext } from 'App';
import styles from './Skills.module.css';
import FormSelector from 'components/form-selector/FormSelector';
export default function Skills() {
  const skills = useContext(InfoContext).skills;
  const loggedIn = useContext(InfoContext).loggedIn;
  const isLoading = useContext(InfoContext).skillsLoading;
  const loading = 'loading...';
  return (
    <section className={styles.skillsSection}>
      <div className={styles.softAndHard}>
        <div className={styles.titleContainer}>
          <p className={styles.title}>Soft and Hard Skills</p>
        </div>
        {!isLoading ? (
          <div className={styles.skills}>
            {skills.map((s, i) => {
              console.log(s);
              if (s.type === 'HardAndSoft') {
                if (!loggedIn) {
                  return <SkillItem s={s} i={i} />;
                }
                return <FormSelector />;
              }
              return '';
            })}
          </div>
        ) : (
          loading
        )}
      </div>
      <div className={styles.languages}>
        <div className={styles.titleContainer}>
          <p className={styles.title}>Languages</p>
        </div>
        {!isLoading ? (
          <div className={styles.skills}>
            {skills.map((s, i) => {
              if (s.type === 'language') {
                if (!loggedIn) {
                  return <SkillItem s={s} i={i} />;
                }
                return <FormSelector item={s} form={''} />;
              }
              return '';
            })}
          </div>
        ) : (
          loading
        )}
      </div>
    </section>
  );
}
