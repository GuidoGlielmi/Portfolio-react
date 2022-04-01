import React from 'react';
import styles from './CloseIcon.module.css';
export default function CloseIcon() {
  return (
    <div className={styles.closeContainer}>
      <div className={styles.close}>
        <div className={styles.closeLeft}></div>
        <div className={styles.closeRight}></div>
      </div>
      <div className={styles.shadow}>
        <div className={styles.shadowLeft}></div>
        <div className={styles.shadowRight}></div>
      </div>
    </div>
  );
}
