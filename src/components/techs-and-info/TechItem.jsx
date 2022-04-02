import CloseAndEdit from 'components/close-icon/CloseAndEdit';
import TechForm from 'components/forms/techs/TechForm';
import { useState } from 'react';
import styles from './TechItem.module.css';
export default function TechItem({ t }) {
  // const loggedIn = useContext(InfoContext).loggedIn;
  const [showForm, setShowForm] = useState(false);
  let loggedIn = true;
  return (
    <div key={t.id} className={styles.techContainer}>
      <div className={styles.techImageContainer}>
        {loggedIn && <CloseAndEdit toggleEdit={() => setShowForm(!showForm)} />}
        {!showForm ? (
          <img className={styles.techImg} src={t.techImg} alt={`${t.techName} logo`} />
        ) : (
          <TechForm t={t} />
        )}
      </div>
    </div>
  );
}
