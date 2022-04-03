import React, { useContext, useState } from 'react';
import { InfoContext } from 'App';
import styles from './Header.module.css';
import CloseAndEdit from 'components/close-icon/CloseAndEdit';
import UserForm from 'components/forms/user/UserForm';
export default function Header({ user, i }) {
  const [editUserInfo, setEditUserInfo] = useState(false);
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
              {loggedIn && <CloseAndEdit toggleEdit={() => setEditUserInfo(!editUserInfo)} />}
              <div className={styles.profileImgContainer}>
                {!editUserInfo ? (
                  <>
                    <img className={styles.profileImg} src={user.profileImg} alt='profile' />
                    <h1 className={`${styles.fullName} darkFont`}>
                      {user.firstName + ' ' + user.lastName}
                    </h1>
                  </>
                ) : (
                  <UserForm u={user} i={i} />
                )}
              </div>
            </div>
          </div>
        ) : (
          loading
        )}
      </div>
    </header>
  );
}
