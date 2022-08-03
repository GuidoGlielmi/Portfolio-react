import {useContext, useEffect, useRef, useState} from 'react';
import {loginContext} from 'components/contexts/login/LoginContext';
import {userContext} from 'components/contexts/user/UserContext';
import CloseAndEdit from 'components/close-icon/CloseAndEdit';
import UserForm from 'components/forms/user/UserForm';
import styles from './Header.module.css';

export default function Header() {
  const {loadingUser, user, saveUser} = useContext(userContext);
  const {loggedIn} = useContext(loginContext);

  const [editUserInfo, setEditUserInfo] = useState(false);
  const firstName = useRef(user.firstName);
  const lastName = useRef(user.lastName);
  const profileImg = useRef(user.profileImg);

  useEffect(() => !loggedIn && setEditUserInfo(false), [loggedIn]);

  async function handleToggle() {
    try {
      if (editUserInfo) {
        await saveUser({
          firstName: firstName.current.value,
          lastName: lastName.current.value,
          profileImg: profileImg.current.value,
        });
      }
      setEditUserInfo(ps => !ps);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <header>
      <div className={styles.infoAndTitle}>
        {loadingUser || (
          <div className={styles.infoContainer}>
            <h2 /* className={styles.headerTitle} */>Welcome to my personal page!</h2>
            <div /* className={styles.userInfo} */>
              {loggedIn && <CloseAndEdit toggleEdit={handleToggle} />}
              <div className={styles.profileImgContainer}>
                {editUserInfo ? (
                  <UserForm firstName={firstName} lastName={lastName} profileImg={profileImg} />
                ) : (
                  <>
                    <img /* className={styles.profileImg} */ src={user.profileImg} alt='profile' />
                    <h1 /* className={`${`${styles.fullName} textShadowLight`} darkFont`} */>
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
