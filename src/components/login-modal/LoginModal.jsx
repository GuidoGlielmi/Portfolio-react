import { InfoContext } from 'App';
import Button from 'components/button/Button';
import { loginApi } from 'index';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginModal.module.css';
export default function LoginModal({ children, closeModal, willResetErrorMsg }) {
  const logIn = useContext(InfoContext).setLoggedIn;

  let navigate = useNavigate();

  const username = useRef('');
  const password = useRef('');

  const [unexistentUser, setUnexistentUser] = useState(false);
  useEffect(() => willResetErrorMsg && setUnexistentUser(false), [willResetErrorMsg]);
  async function login(e) {
    e.preventDefault();
    const user = {
      username: username.current.value,
      password: password.current.value,
    };
    try {
      const res = await loginApi.post('/login', user, {
        validateStatus: (status) => {
          return status !== 403;
        },
      });
      const token = res.headers.authorization;
      sessionStorage.setItem('accessToken', token);
      logIn(true);
      setInterval(() => {
        sessionStorage.removeItem('accessToken');
        logIn(false);
      }, 1000 * 60 * 60);
      if (closeModal) closeModal();
      return navigate('/guest', { replace: true });
    } catch ({ response }) {
      /* console.log(response);
      if (response.status === 403) */ setUnexistentUser(true);
    }
  }
  return (
    <div className={styles.modal}>
      <div className={styles.title}>
        <p>Login</p>
      </div>
      <form onSubmit={login} className={styles.inputs}>
        <div className={styles.input}>
          <label htmlFor='user' className={styles.label}>
            Account
          </label>
          <input ref={username} name='user' id='user' />
        </div>
        <div className={styles.input}>
          <label htmlFor='password' className={styles.label}>
            Password
          </label>
          <input ref={password} type='password' name='password' id='password' />
        </div>
        <div className={styles.logInButton} onClick={(e) => login(e)}>
          <Button>Log in</Button>
        </div>
        {children}
        {unexistentUser && <div className={styles.unexistentUser}>Invalid credentials</div>}
      </form>
    </div>
  );
}
