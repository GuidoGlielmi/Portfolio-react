import React, { useContext } from 'react';
import { InfoContext } from 'App';
import styles from './Header.module.css';
export default function Header() {
  const user = useContext(InfoContext).user[0];
  const loggedIn = useContext(InfoContext).loggedIn;
  const loading = 'loading...';
  return (
    <header>
      <div className={styles.containerContainer}>
        {user ? (
          <div className={styles.infoContainer}>
            <div className={styles.headerTitleContainer}>
              <h2 className={styles.headerTitle}>Welcome to my personal page!</h2>
            </div>
            <div className={styles.userInfo}>
              <img className={styles.profileImg} src={user?.profileImg} alt='profile' />
              <h1 className={`${styles.fullName} darkFont`}>
                {user?.firstName + ' ' + user?.lastName}
              </h1>
            </div>
          </div>
        ) : (
          loading
        )}
      </div>
    </header>
  );
}
