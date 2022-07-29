import {InfoContext} from 'App';
import Button from 'components/button/Button';
import {useContext, useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import fetch from 'services/fetch';
import styles from './LoginModal.module.css';
export default function LoginModal({children, closeModal, willResetErrorMsg}) {
  const {setloggedIn} = useContext(InfoContext);

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
      const token = await fetch.post('login', user);
      sessionStorage.setItem('accessToken', token);
      setloggedIn(true);
      setInterval(() => {
        sessionStorage.removeItem('accessToken');
        setloggedIn(false);
      }, 1000 * 60 * 60);
      if (closeModal) closeModal();
      return navigate('/guest', {replace: true});
    } catch ({message, status}) {
      setUnexistentUser(true);
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
        <div className={styles.setloggedInButton}>
          <Button>Log in</Button>
        </div>
        {children}
        {unexistentUser && <div className={styles.unexistentUser}>Invalid credentials</div>}
      </form>
    </div>
  );
}
