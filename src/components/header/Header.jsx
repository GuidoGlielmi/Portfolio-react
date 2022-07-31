import {useContext, useEffect, useState} from 'react';
import {userContext} from 'components/contexts/user/UserContext';
import CloseAndEdit from 'components/close-icon/CloseAndEdit';
import UserForm from 'components/forms/user/UserForm';
import styles from './Header.module.css';

export default function Header() {
  const {loggedIn, loadingUser, user} = useContext(userContext);

  const [editUserInfo, setEditUserInfo] = useState(false);

  useEffect(() => !loggedIn && setEditUserInfo(false), [loggedIn]);

  return (
    <header>
      <div className={styles.infoAndTitle}>
        {loadingUser || (
          <div className={styles.infoContainer}>
            <h2 className={styles.headerTitle}>Welcome to my personal page!</h2>
            <div className={styles.userInfo}>
              {loggedIn && <CloseAndEdit toggleEdit={() => setEditUserInfo(ps => !ps)} />}
              <div className={styles.profileImgContainer}>
                {editUserInfo ? (
                  <UserForm />
                ) : (
                  <>
                    <img className={styles.profileImg} src={user.profileImg} alt='profile' />
                    <h1 className={`${`${styles.fullName} textShadowLight`} darkFont`}>
                      {`${user.firstName} ${user.lastName}`}
                    </h1>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
