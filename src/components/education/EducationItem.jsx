import {useContext, useState} from 'react';
import {loginContext} from 'components/contexts/login/LoginContext';
import {userFeedbackContext} from 'components/contexts/user-feedback/UserFeedbackContext';
import CloseAndEdit from 'components/close-icon/CloseAndEdit';
import EducationForm from 'components/forms/education/EducationForm';
import {when} from 'components/techs-and-info/TechsAndInfo';
import styles from './EducationItem.module.css';

export default function EducationItem({
  education,
  education: {id, educationImg, school, degree, startDate, endDate},
  setEducations,
}) {
  const {loggedIn} = useContext(loginContext);
  const {makeRequest} = useContext(userFeedbackContext);
  const [showForm, setShowForm] = useState(false);

  if (!loggedIn && showForm) setShowForm(false);

  async function deleteEducation() {
    try {
      await makeRequest({url: `education/${id}`, method: 'delete'}, 'Education deleted');
      setEducations(pe => pe.filter(e => e.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  async function updateEducation(newEducation) {
    try {
      await makeRequest(
        {url: 'education', body: newEducation, method: 'put'},
        'Education modified',
      );
      setEducations(pe => pe.map(e => (e.id === id ? newEducation : e)));
      setShowForm(false);
    } catch (err) {
      console.log(err);
    }
  }

  const toggleEdit = () => setShowForm(ps => !ps);

  return (
    <>
      {loggedIn && <CloseAndEdit toggleEdit={toggleEdit} deleteItem={deleteEducation} />}
      {when(showForm)
        .return(<EducationForm education={education} handleSubmit={updateEducation} />)
        .else(
          <div className={styles.educationItem}>
            <div className={styles.educationImgContainer}>
              <img src={educationImg} alt={`${school} logo`} />
            </div>
            <div className={styles.educationInfo}>
              <h3>{degree}</h3>
              <p>{school}</p>
              <p>{startDate}</p>
              <p>{endDate}</p>
            </div>
          </div>,
        )}
    </>
  );
}
