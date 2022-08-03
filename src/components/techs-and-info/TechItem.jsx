import {useContext, useEffect, useRef, useState} from 'react';
import {loginContext} from 'components/contexts/login/LoginContext';
import {userFeedbackContext} from 'components/contexts/user-feedback/UserFeedbackContext';
import {userContext} from 'components/contexts/user/UserContext';
import CloseAndEdit from 'components/close-icon/CloseAndEdit';
import TechForm from 'components/forms/techs/TechForm';
import styles from './TechItem.module.css';

export default function TechItem({tech}) {
  const {setTechs} = useContext(userContext);
  const {loggedIn} = useContext(loginContext);
  const {makeRequest} = useContext(userFeedbackContext);
  const [showForm, setShowForm] = useState(false);
  const techNode = useRef();
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
    <div className={styles.techContainer} ref={techNode}>
      <div className={styles.techImageContainer}>
        {loggedIn && (
          <CloseAndEdit toggleEdit={() => setShowForm(ps => !ps)} deleteItem={deleteTech} />
        )}
        {!showForm ? (
          <img src={tech.techImg} alt={`${tech.techName} logo`} title={tech.name} />
        ) : (
          <TechForm tech={tech} handleSubmit={updateTech} />
        )}
      </div>
    </div>
  );
}
