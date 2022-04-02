import React from 'react';
import CloseIcon from './CloseIcon';
import styles from './CloseAndEdit.module.css';

export default function CloseAndEdit({ toggleEdit }) {
  return (
    <div className={styles.CloseAndEditContainer}>
      <CloseIcon />
      <img
        className={styles.editIcon}
        onClick={() => toggleEdit()}
        src='assets/icons/edit-icon.png'
        alt='edit icon'
      />
    </div>
  );
}
