import {useContext, useEffect, useRef, useState} from 'react';
import {loginContext} from 'components/contexts/login/LoginContext';
import {userFeedbackContext} from 'components/contexts/user-feedback/UserFeedbackContext';
import Button from 'components/button/Button';
import styles from './LoginModal.module.css';

export default function LoginModal({children, closeModal, willResetErrorMsg}) {
  const {makeRequest} = useContext(userFeedbackContext);
  const {setLoggedIn} = useContext(loginContext);
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
      const token = await makeRequest({url: 'login', body: user, method: 'post'});
      localStorage.setItem('accessToken', token);
      setLoggedIn(true);
      if (closeModal) closeModal();
    } catch ({message, status}) {
      setUnexistentUser(true);
    }
  }

  return (
    <div className={styles.modal}>
      <p>Login</p>
      <form onSubmit={login}>
        <div>
          <label htmlFor='user'>Account</label>
          <input ref={username} name='user' id='user' />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input ref={password} type='password' name='password' id='password' />
        </div>
        <div>
          <Button>Log in</Button>
        </div>
        {children}
        {unexistentUser && <span className={styles.unexistentUser}>Invalid credentials</span>}
      </form>
    </div>
  );
}
