import styles from './UserForm.module.css';

export default function UserForm({firstName, lastName, profileImg}) {
  return (
    <form className={styles.userInfoForm}>
      <div className={styles.inputLabel}>
        <label className={styles.userLabel} htmlFor='firstName'>
          firstName
        </label>
        <input
          defaultValue={firstName.current}
          ref={firstName}
          className={styles.userInput}
          name='firstName'
          id='firstName'
        />
      </div>
      <div className={styles.inputLabel}>
        <label className={styles.userLabel} htmlFor='lastName'>
          Last name
        </label>
        <input
          defaultValue={lastName.current}
          ref={lastName}
          className={styles.userInput}
          name='lastName'
          id='lastName'
        />
      </div>
      <div className={styles.inputLabel}>
        <label className={styles.userLabel} htmlFor='profileImg'>
          Profile image path
        </label>
        <input
          defaultValue={profileImg.current}
          ref={profileImg}
          className={styles.userInput}
          name='profileImg'
          id='profileImg'
        />
      </div>
    </form>
  );
}
