import { InfoContext } from 'App';
import CloseAndEdit from 'components/close-icon/CloseAndEdit';
import TechForm from 'components/forms/techs/TechForm';
import { adminApi } from 'index';
import { useContext, useEffect, useState } from 'react';
import styles from './TechItem.module.css';
export default function TechItem({ t, i }) {
  const [showForm, setShowForm] = useState(false);
  const loggedIn = useContext(InfoContext).loggedIn;
  const techs = useContext(InfoContext).techs;
  const setTech = useContext(InfoContext).setTechs;
  useEffect(() => {
    if (!loggedIn) setShowForm(false);
  }, [loggedIn]);
  async function deleteTech() {
    await adminApi.delete(`/techs/${t.id}`);
    techs.splice(i, 1);
    setTech([...techs]);
  }
  return (
    <div className={styles.techContainer}>
      <div className={styles.techImageContainer}>
        {loggedIn && (
          <CloseAndEdit toggleEdit={() => setShowForm(!showForm)} deleteItem={deleteTech} />
        )}
        {!showForm ? (
          <img className={styles.techImg} src={t.techImg} alt={`${t.techName} logo`} />
        ) : (
          <TechForm t={t} />
        )}
      </div>
    </div>
  );
}
