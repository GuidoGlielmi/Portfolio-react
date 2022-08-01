import {useContext, useEffect, useState} from 'react';
import {userContext} from 'components/contexts/user/UserContext';
import CloseAndEdit from 'components/close-icon/CloseAndEdit';
import TechForm from 'components/forms/techs/TechForm';
import styles from './TechItem.module.css';

export default function TechItem({tech}) {
  const {loggedIn, makeRequest, setTechs} = useContext(userContext);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!loggedIn) setShowForm(false);
  }, [loggedIn]);

  async function deleteTech() {
    try {
      await makeRequest({url: `techs/${tech.id}`, method: 'delete'}, 'Technology deleted');
      setTechs(pt => pt.filter(({id}) => id !== tech.id));
    } catch (err) {
      console.log(err);
    }
  }

  async function updateTech(newTech) {
    try {
      await makeRequest({url: 'techs', body: newTech, method: 'put'}, 'Technology updated');
      setTechs(pt => pt.map(e => (e.id === tech.id ? newTech : e)));
      setShowForm(false);
    } catch (err) {
      console.log(err);
    }
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
