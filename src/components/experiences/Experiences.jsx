import {useContext, useEffect, useState} from 'react';
import {userContext} from 'components/contexts/user/UserContext';
import ExperienceForm from 'components/forms/experiences/ExperienceForm';
import Button from 'components/button/Button';
import ExperienceItem from './ExperienceItem';
import styles from './Experiences.module.css';

export default function Experiences() {
  const {loggedIn, makeRequest, useFetch} = useContext(userContext);

  const [loading, experiences, setExperiences] = useFetch({url: 'experiences'});

  const [showNewForm, setShowNewForm] = useState(false);

  useEffect(() => !loggedIn && setShowNewForm(false), [loggedIn]);

  const toggleNewForm = () => setShowNewForm(ps => !ps);

  async function addExperience(newExperience) {
    const addedExperienceId = await makeRequest({
      url: 'experiences',
      body: newExperience,
      method: 'post',
    });
    newExperience.id = addedExperienceId;
    setExperiences([...experiences, newExperience]);
    setShowNewForm(false);
  }

  return (
    <section className={styles.experiencesSection}>
      <div className={styles.titleContainer}>
        <p className={`${styles.title} textShadowLight`}>My Experiences</p>
      </div>
      <div className={styles.experiences}>
        {loading ||
          experiences.map(e => (
            <ExperienceItem key={e.id} experience={e} setExperiences={setExperiences} />
          ))}
      </div>
      {showNewForm && <ExperienceForm handleSubmit={addExperience} />}
      {loggedIn && (
        <div onClick={toggleNewForm} className={styles.addButton}>
          <Button>Add experience</Button>
        </div>
      )}
    </section>
  );
}
