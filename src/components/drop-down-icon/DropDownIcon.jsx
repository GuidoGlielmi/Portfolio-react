import React from 'react';
import styles from './DropDownIcon.module.css';
export default function DropDownIcon({ onClick }) {
  return (
    <div onClick={onClick} className={styles.dropDown}>
      <div className={styles.arrow}>
        <div className={styles.dropDownLeftSide}></div>
        <div className={styles.dropDownRightSide}></div>
      </div>
      <div className={styles.shadow}>
        <div className={styles.shadowLeft}></div>
        <div className={styles.shadowRight}></div>
      </div>
    </div>
  );
}
