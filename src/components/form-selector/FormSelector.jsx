import Button from 'components/button/Button';
import CloseIcon from 'components/close-icon/CloseIcon';
import styles from './FormSelector.module.css';
import { useState } from 'react';

export default function FormSelector({ item, form }) {
  const [showForm, setShowForm] = useState(false);
  function deleteElement() {}
  return (
    <>
      <CloseIcon onClick={() => deleteElement()} />
      <img
        className={styles.editIcon}
        onClick={() => setShowForm(!showForm)}
        src='assets/icons/edit-icon.png'
        alt='edit icon'
      />
      {!showForm ? item : form}
    </>
  );
}
