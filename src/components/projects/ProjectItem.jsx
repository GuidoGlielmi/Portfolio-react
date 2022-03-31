import React from 'react';
import styles from './ProjectItem.module.css';
export default function ProjectItem({ p, i }) {
  return (
    <div
      className={`${styles.projectContainer} ${
        i % 2 === 0 ? styles.projectContainerRight : styles.projectContainerLeft
      }`}
    >
      <div className={i % 2 === 0 ? styles.projectRight : styles.projectLeft}>
        <div className={styles.projectImgContainer}>
          <img className={styles.projectImg} src={p.projectImg} alt={`${p.title} logo`} />
        </div>
        <div className={styles.projectInfoContainer}>
          <h3 className={styles.projectTitle}>{p.title}</h3>
          <p className={styles.projectDescription}>{p.description}</p>
          <div className={styles.urls}>
            {p.urls.map((u) => (
              <a className={styles.url} href={u.url} target='_blank' rel='noreferrer'>
                {u.name}
              </a>
            ))}
          </div>
          <div className={styles.techs}>
            {p.techs.map((t, i) => {
              return i !== p.techs.length - 1 ? (
                <span className={styles.tech}>{t.name} - </span>
              ) : (
                <span className={styles.tech}>{t.name}</span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
