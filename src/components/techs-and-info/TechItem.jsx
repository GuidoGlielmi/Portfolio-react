import {InfoContext} from 'App';
import CloseAndEdit from 'components/close-icon/CloseAndEdit';
import TechForm from 'components/forms/techs/TechForm';
import {useContext, useEffect, useState} from 'react';
import styles from './TechItem.module.css';
export default function TechItem({tech, setTechs}) {
  const {loggedIn} = useContext(InfoContext);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!loggedIn) setShowForm(false);
  }, [loggedIn]);

  async function deleteTech() {
    await fetch.delete(`techs/${tech.id}`);
    setTechs(pt => pt.filter(({id}) => id !== tech.id));
  }

  async function updateTech(newTech) {
    await fetch.put('techs', newTech);
    setTechs(pt => pt.map(e => (e.id === tech.id ? newTech : e)));
    setShowForm(false);
  }

  return (
    <div className={styles.techContainer}>
      <div className={styles.techImageContainer}>
        {loggedIn && (
          <CloseAndEdit toggleEdit={() => setShowForm(ps => !ps)} deleteItem={deleteTech} />
        )}
        {!showForm ? (
          <img className={styles.techImg} src={tech.techImg} alt={`${tech.techName} logo`} />
        ) : (
          <TechForm tech={tech} handleSubmit={updateTech} />
        )}
      </div>
    </div>
  );
}
