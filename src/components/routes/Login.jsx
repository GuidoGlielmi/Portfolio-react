import LoginModal from 'components/login-modal/LoginModal';
import {Link} from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => (
  <div className={styles.loginBackground}>
    <LoginModal>
      <div className={styles.enterAsGuest}>
        <Link to='/guest'>Or enter as guest</Link>
      </div>
    </LoginModal>
  </div>
);
export default Login;
