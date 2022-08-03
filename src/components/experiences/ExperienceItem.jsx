import {useContext, useState} from 'react';
import {loginContext} from 'components/contexts/login/LoginContext';
import {userFeedbackContext} from 'components/contexts/user-feedback/UserFeedbackContext';
import CloseAndEdit from 'components/close-icon/CloseAndEdit';
import ExperienceForm from 'components/forms/experiences/ExperienceForm';
import styles from './ExperienceItem.module.css';

export default function ExperienceItem({experience, setExperiences}) {
  const {loggedIn} = useContext(loginContext);
  const {makeRequest} = useContext(userFeedbackContext);
  const [showForm, setShowForm] = useState(false);

  if (!loggedIn && showForm) setShowForm(false);

  async function deleteExperience() {
    try {
      await makeRequest(
        {url: `experiences/${experience.id}`, method: 'delete'},
        'Experience deleted',
      );
      setExperiences(pe => pe.filter(({id}) => id !== experience.id));
    } catch (err) {
      console.log(err);
    }
  }

  async function updateExperience(newExperience) {
    try {
      await makeRequest(
        {url: 'experiences', body: newExperience, method: 'put'},
        'Experience modified',
      );
      setExperiences(pe => pe.map(e => (e.id === newExperience.id ? newExperience : e)));
      setShowForm(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div>
        <div className={styles.experiencePadding}>
          <div>
            {loggedIn && (
              <CloseAndEdit
                toggleEdit={() => setShowForm(ps => !ps)}
                deleteItem={deleteExperience}
              />
            )}
            <div className={styles.experienceImgContainer}>
              <img src={experience.experienceImg} alt={`${experience.title} logo`} />
            </div>
            {!showForm ? (
              <div className='experienceInfoContainer'>
                <h3 /* className={styles.experienceTitle} */>{experience.title}</h3>
                <div /* className={styles.dates} */>
                  <span>{experience.startDate} - </span>
                  <span>{experience.endDate}</span>
                </div>
                <p /* className={styles.experienceDescription} */>{experience.description}</p>
                {experience.certificate && (
                  <a href={experience.certificate} target='_blank' rel='noreferrer'>
                    Certificate
                  </a>
                )}
              </div>
            ) : (
              <ExperienceForm experience={experience} handleSubmit={updateExperience} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
