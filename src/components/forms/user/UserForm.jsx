import { useRef } from 'react';
import styles from './UserForm.module.css';
export default function UserForm({ u }) {
  // const loggedIn = useContext(InfoContext).loggedIn;
  const loggedIn = true;
  const firstName = useRef('');
  const lastName = useRef('');
  const profileImg = useRef('');
  return (
    <form className={styles.userInfoForm}>
      <div className={styles.inputLabel}>
        <label className={styles.userLabel} htmlFor='firstName'>
          firstName
        </label>
        <input
          defaultValue={u.firstName}
          className={styles.userInput}
          ref={firstName}
          name='firstName'
          id='firstName'
        />
      </div>
      <div className={styles.inputLabel}>
        <label className={styles.userLabel} htmlFor='lastName'>
          Last name
        </label>
        <input
          defaultValue={u.lastName}
          className={styles.userInput}
          ref={lastName}
          name='lastName'
          id='lastName'
        />
      </div>
      <div className={styles.inputLabel}>
        <label className={styles.userLabel} htmlFor='profileImg'>
          Profile image path
        </label>
        <input
          defaultValue={u.profileImg}
          className={styles.userInput}
          ref={profileImg}
          name='profileImg'
          id='profileImg'
        />
      </div>
    </form>
  );
}
