import {InfoContext} from 'App';
import CloseAndEdit from 'components/close-icon/CloseAndEdit';
import EducationForm from 'components/forms/education/EducationForm';
import {when} from 'components/techs-and-info/TechsAndInfo';
import React, {useContext, useState} from 'react';
import fetch from 'services/fetch';
import styles from './EducationItem.moduleducation.css';

export default function EducationItem({education, setEducations, i}) {
  const {loggedIn} = useContext(InfoContext);
  const position = i % 2 ? 'Left' : 'Right';
  const [showForm, setShowForm] = useState(false);

  if (!loggedIn && showForm) setShowForm(false);

  async function deleteEducation() {
    await fetch.delete(`education/${education.id}`);
    setEducations(pe => pe.filter(({id}) => id !== education.id));
  }

  async function updateEducation(newEducation) {
    await fetch.put('education', newEducation);
    setEducations(pe => pe.map(e => (e.id === education.id ? newEducation : e)));
    setShowForm(false);
  }

  const toggleEdit = () => setShowForm(ps => !ps);

  return (
    <div className={`${styles.educationContainer} ${styles[`educationContainer${position}`]}`}>
      {loggedIn && <CloseAndEdit toggleEdit={toggleEdit} deleteItem={deleteEducation} />}
      {when(showForm)
        .return(<EducationForm education={education} handleSubmit={updateEducation} />)
        .else(
          <div className={styles[`education${position}`]}>
            <div className={styles.educationImgContainer}>
              <img
                className={styles.educationImg}
                src={education.educationImg}
                alt={`${education.school} logo`}
              />
            </div>
            <div className={styles.educationInfoContainer}>
              <h3 className={styles.educationDegree}>{education.degree}</h3>
              <p className={styles.educationP}>{education.school}</p>
              <p className={styles.educationP}>{education.startDate}</p>
              <p className={styles.educationP}>{education.endDate}</p>
            </div>
          </div>,
        )}
    </div>
  );
}
