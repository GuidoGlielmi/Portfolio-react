import {userContext} from 'components/contexts/user/UserContext';
import {useContext} from 'react';
import styles from './UserForm.module.css';

export default function UserForm() {
  const {user, setUser} = useContext(userContext);

  return (
    <form className={styles.userInfoForm}>
      <div className={styles.inputLabel}>
        <label className={styles.userLabel} htmlFor='firstName'>
          firstName
        </label>
        <input
          defaultValue={user.firstName}
          className={styles.userInput}
          onChange={e => setUser(pu => ({...pu, firstName: e.target.value}))}
          name='firstName'
          id='firstName'
        />
      </div>
      <div className={styles.inputLabel}>
        <label className={styles.userLabel} htmlFor='lastName'>
          Last name
        </label>
        <input
          defaultValue={user.lastName}
          className={styles.userInput}
          onChange={e => setUser(pu => ({...pu, lastName: e.target.value}))}
          name='lastName'
          id='lastName'
        />
      </div>
      <div className={styles.inputLabel}>
        <label className={styles.userLabel} htmlFor='profileImg'>
          Profile image path
        </label>
        <input
          defaultValue={user.profileImg}
          className={styles.userInput}
          onChange={e => setUser(pu => ({...pu, profileImg: e.target.value}))}
          name='profileImg'
          id='profileImg'
        />
      </div>
    </form>
  );
}
