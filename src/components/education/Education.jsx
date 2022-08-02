import {useContext, useEffect, useState} from 'react';
import {userFeedbackContext} from 'components/contexts/user-feedback/UserFeedbackContext';
import {loginContext} from 'components/contexts/login/LoginContext';
import useFetch from 'components/custom-hooks/useFetch';
import EducationForm from 'components/forms/education/EducationForm';
import Button from 'components/button/Button';
import EducationItem from './EducationItem';
import styles from './Education.module.css';

export default function Education() {
  const {loggedIn} = useContext(loginContext);
  const {makeRequest} = useContext(userFeedbackContext);
  const [loading, educations, setEducations] = useFetch({url: 'education'});

  const [showNewForm, setShowNewForm] = useState(false);

  useEffect(() => !loggedIn && setShowNewForm(false), [loggedIn]);

  const toggleNewForm = () => setShowNewForm(ps => !ps);

  async function addEducation(newEducation) {
    try {
      const addedEducationId = await makeRequest(
        {
          url: 'education',
          body: newEducation,
          method: 'post',
        },
        'Education added successfully',
      );
      newEducation.id = addedEducationId;
      setEducations(pe => [...pe, newEducation]);
      setShowNewForm(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className={styles.educationSection}>
      <div className={styles.titleContainer}>
        <p className={`${styles.title} textShadowLight`}>My studies</p>
      </div>
      <div className={styles.education}>
        {loading ||
          educations.map((e, i) => (
            <EducationItem education={e} i={i} key={e.id} setEducations={setEducations} />
          ))}
      </div>
      {showNewForm && <EducationForm handleSubmit={addEducation} />}
      {loggedIn && (
        <div onClick={toggleNewForm} className={styles.addButton}>
          <Button>Add education</Button>
        </div>
      )}
    </section>
  );
}
