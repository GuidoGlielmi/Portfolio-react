import React, {useContext, useEffect, useState} from 'react';
import {InfoContext} from 'App';
import styles from './Header.module.css';
import CloseAndEdit from 'components/close-icon/CloseAndEdit';
import UserForm from 'components/forms/user/UserForm';
import LoadingIcon from 'components/loading-icon/LoadingIcon';
export default function Header({i}) {
  const {loggedIn, user} = useContext(InfoContext);

  const [editUserInfo, setEditUserInfo] = useState(false);

  useEffect(() => !loggedIn && setEditUserInfo(false), [loggedIn]);

  return (
    <header>
      <div className={styles.infoAndTitle}>
        {user ? (
          <div className={styles.infoContainer}>
            <h2 className={styles.headerTitle}>Welcome to my personal page!</h2>
            <div className={styles.userInfo}>
              {loggedIn && <CloseAndEdit toggleEdit={() => setEditUserInfo(ps => !ps)} />}
              <div className={styles.profileImgContainer}>
                {!editUserInfo ? (
                  <>
                    <img className={styles.profileImg} src={user.profileImg} alt='profile' />
                    <h1 className={`${`${styles.fullName} textShadowLight`} darkFont`}>
                      {`${user.firstName} ${user.lastName}`}
                    </h1>
                  </>
                ) : (
                  <UserForm u={user} i={i} />
                )}
              </div>
            </div>
          </div>
        ) : (
          <LoadingIcon />
        )}
      </div>
    </header>
  );
}
