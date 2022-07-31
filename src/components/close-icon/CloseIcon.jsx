import React from 'react';
import styles from './CloseIcon.module.css';

const CloseIcon = ({size}) => (
  <div style={{width: size, height: size}} className={styles.closeContainer}>
    <div className={styles.close}>
      <div className={styles.closeLeft} />
      <div className={styles.closeRight} />
    </div>
    <div className={styles.shadow}>
      <div className={styles.shadowLeft} />
      <div className={styles.shadowRight} />
    </div>
  </div>
);
export default CloseIcon;
