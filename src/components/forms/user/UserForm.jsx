import styles from './UserForm.module.css';

export default function UserForm({firstName, lastName, profileImg}) {
  return (
    <form className={styles.userInfoForm}>
      <div>
        <label htmlFor='firstName'>firstName</label>
        <input defaultValue={firstName.current} ref={firstName} name='firstName' id='firstName' />
      </div>
      <div>
        <label htmlFor='lastName'>Last name</label>
        <input defaultValue={lastName.current} ref={lastName} name='lastName' id='lastName' />
      </div>
      <div>
        <label htmlFor='profileImg'>Profile image path</label>
        <input
          defaultValue={profileImg.current}
          ref={profileImg}
          name='profileImg'
          id='profileImg'
        />
      </div>
    </form>
  );
}
