import {useContext, useState} from 'react';
import {userContext} from 'components/contexts/user/UserContext';
import CloseAndEdit from 'components/close-icon/CloseAndEdit';
import EducationForm from 'components/forms/education/EducationForm';
import {when} from 'components/techs-and-info/TechsAndInfo';
import styles from './EducationItem.module.css';

export default function EducationItem({
  education,
  education: {id, educationImg, school, degree, startDate, endDate},
  setEducations,
}) {
  const {loggedIn, makeRequest} = useContext(userContext);
  // const position = i % 2 ? 'Left' : 'Right';
  const [showForm, setShowForm] = useState(false);

  if (!loggedIn && showForm) setShowForm(false);

  async function deleteEducation() {
    await makeRequest({url: `education/${id}`, method: 'delete'});
    setEducations(pe => pe.filter(e => e.id !== id));
  }

  async function updateEducation(newEducation) {
    await makeRequest({url: 'education', body: newEducation, method: 'put'});
    setEducations(pe => pe.map(e => (e.id === id ? newEducation : e)));
    setShowForm(false);
  }

  const toggleEdit = () => setShowForm(ps => !ps);

  return (
    <div /* className={`${styles.educationContainer} ${styles[`educationContainer${position}`]}`} */
    >
      {loggedIn && <CloseAndEdit toggleEdit={toggleEdit} deleteItem={deleteEducation} />}
      {when(showForm)
        .return(<EducationForm education={education} handleSubmit={updateEducation} />)
        .else(
          <div className='educationInfo' /* className={styles[`education${position}`]} */>
            <div className={styles.educationImgContainer}>
              <img className={styles.educationImg} src={educationImg} alt={`${school} logo`} />
            </div>
            <div className={styles.educationInfoContainer}>
              <h3 className={styles.educationDegree}>{degree}</h3>
              <p className={styles.educationP}>{school}</p>
              <p className={styles.educationP}>{startDate}</p>
              <p className={styles.educationP}>{endDate}</p>
            </div>
          </div>,
        )}
    </div>
  );
}
