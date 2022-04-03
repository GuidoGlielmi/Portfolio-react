import { InfoContext } from 'App';
import { useContext } from 'react';
import styles from './UserForm.module.css';
export default function UserForm({ u, i }) {
  const users = useContext(InfoContext).users;
  const setUsers = useContext(InfoContext).setUsers;
  return (
    <form className={styles.userInfoForm}>
      <div className={styles.inputLabel}>
        <label className={styles.userLabel} htmlFor='firstName'>
          firstName
        </label>
        <input
          defaultValue={u.firstName}
          className={styles.userInput}
          onInput={({ target: { value } }) => {
            users[i] = {
              ...u,
              firstName: value,
            };
            setUsers([...users]);
          }}
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
          onInput={({ target: { value } }) => {
            users[i] = {
              ...u,
              lastName: value,
            };
            setUsers([...users]);
          }}
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
          onInput={({ target: { value } }) => {
            users[i] = {
              ...u,
              profileImg: value,
            };
            setUsers([...users]);
          }}
          name='profileImg'
          id='profileImg'
        />
      </div>
    </form>
  );
}
