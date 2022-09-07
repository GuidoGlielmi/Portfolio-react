import {useContext, useEffect, useState} from 'react';
import {loginContext} from 'components/contexts/login/LoginContext';
import {userFeedbackContext} from 'components/contexts/user-feedback/UserFeedbackContext';
import {userContext} from 'components/contexts/user/UserContext';
import ExperienceForm from 'components/forms/experiences/ExperienceForm';
import Button from 'components/button/Button';
import ExperienceItem from './ExperienceItem';
import styles from './Experiences.module.css';

export default function Experiences() {
  const {loggedIn} = useContext(loginContext);
  const {makeRequest} = useContext(userFeedbackContext);
  const {loadingExperiences: loading, experiences, setExperiences} = useContext(userContext);

  const [showNewForm, setShowNewForm] = useState(false);

  useEffect(() => !loggedIn && setShowNewForm(false), [loggedIn]);

  const toggleNewForm = () => setShowNewForm(ps => !ps);

  async function addExperience(newExperience) {
    try {
      const addedExperienceId = await makeRequest({
        url: 'experiences',
        body: newExperience,
        method: 'post',
      });
      newExperience.id = addedExperienceId;
      setExperiences([...experiences, newExperience]);
      setShowNewForm(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className={styles.experiencesSection}>
      <h2>My Experiences</h2>
      {loading || experiences.map(e => <ExperienceItem key={e.id} experience={e} setExperiences={setExperiences} />)}
      {showNewForm && <ExperienceForm handleSubmit={addExperience} />}
      {loggedIn && (
        <span onClick={toggleNewForm} className={styles.addButton}>
          <Button>Add experience</Button>
        </span>
      )}
    </section>
  );
}
