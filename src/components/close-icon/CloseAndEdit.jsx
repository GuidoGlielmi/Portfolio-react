import React from 'react';
import CloseIcon from './CloseIcon';
import styles from './CloseAndEdit.module.css';

export default function CloseAndEdit({toggleEdit, deleteItem}) {
  return (
    <div className={styles.CloseAndEditContainer}>
      <div className={styles.closeIconContainer} onClick={deleteItem}>
        <CloseIcon />
      </div>
      <img
        className={styles.editIcon}
        onClick={toggleEdit}
        src='./assets/icons/edit-icon.png'
        alt='edit icon'
      />
    </div>
  );
}
export function Edit({toggleEdit}) {
  return (
    <div className={styles.CloseAndEditContainer}>
      <img
        className={styles.editIcon}
        onClick={toggleEdit}
        src='./assets/icons/edit-icon.png'
        alt='edit icon'
      />
    </div>
  );
}
