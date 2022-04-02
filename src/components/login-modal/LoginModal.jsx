import { InfoContext } from 'App';
import Button from 'components/button/Button';
import { useContext } from 'react';
import styles from './LoginModal.module.css';
export default function LoginModal({ children }) {
  const logIn = useContext(InfoContext).setLoggedIn;
  async function login(user) {
    const options = {
      method: 'POST',
      body: user,
    };
    try {
      const rawResponse = await fetch('http://localhost:8080/login', options);
      if (rawResponse.status !== 200) {
        console.log('error');
      }
      const response = await rawResponse.json();
      logIn(response.headers.get('Authorization'));
    } catch (err) {
      console.log(err);
    }
  }
  function submit() {}
  return (
    <div className={styles.modal}>
      <div className={styles.title}>
        <p>Login</p>
      </div>
      <form onSubmit={submit} className={styles.inputs}>
        <div className={styles.input}>
          <label for='user'>Account </label>
          <input name='user' id='user' />
        </div>
        <div className={styles.input}>
          <label for='password'>Password </label>
          <input type='password' name='password' id='password' />
        </div>
        <div className={styles.logInButton}>
          {children}
          <Button>Log in</Button>
        </div>
      </form>
    </div>
  );
}
