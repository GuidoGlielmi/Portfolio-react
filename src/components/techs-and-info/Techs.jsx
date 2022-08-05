import {useContext, useEffect, useRef, useState} from 'react';
import {loginContext} from 'components/contexts/login/LoginContext';
import {userFeedbackContext} from 'components/contexts/user-feedback/UserFeedbackContext';
import {userContext} from 'components/contexts/user/UserContext';
import TechForm from 'components/forms/techs/TechForm';
import Button from 'components/button/Button';
import TechItem from './TechItem';
import styles from './Techs.module.css';

export default function Techs() {
  const {techs, setTechs, loadingTechs: loading} = useContext(userContext);
  const {loggedIn} = useContext(loginContext);
  const {makeRequest} = useContext(userFeedbackContext);
  const [showNewForm, setShowNewForm] = useState(false);
  const techImg = useRef('');
  const techsContainer = useRef('');

  useEffect(() => {
    if (!loggedIn) setShowNewForm(false);
  }, [loggedIn]);

  function onWheel(e) {
    const scrollUnit = techImg.current.offsetWidth;
    const currentValue = techsContainer.current.scrollLeft;
    const maxValue = techsContainer.current.scrollWidth - techsContainer.current.clientWidth;
    const totalWidth = techsContainer.current.scrollWidth;
    if (e.deltaY > 0) {
      if (maxValue - currentValue < scrollUnit) {
        techsContainer.current.scrollTo({
          left: currentValue - totalWidth / 2,
          top: 0,
          behavior: 'instant',
        });
        techsContainer.current.scrollTo({
          left: currentValue - totalWidth / 2 + scrollUnit,
          top: 0,
          behavior: 'smooth',
        });
      } else {
        techsContainer.current.scrollTo({
          left: currentValue + scrollUnit,
          top: 0,
          behavior: 'smooth',
        });
      }
    } else if (currentValue - scrollUnit < scrollUnit) {
      techsContainer.current.scrollTo({
        left: currentValue - totalWidth / 2,
        top: 0,
        behavior: 'instant',
      });
      techsContainer.current.scrollTo({
        left: totalWidth / 2 + Math.abs(currentValue - scrollUnit),
        top: 0,
        behavior: 'smooth',
      });
    } else {
      techsContainer.current.scrollTo({
        left: currentValue - scrollUnit,
        top: 0,
        behavior: 'smooth',
      });
    }
  }

  async function addTech(newTech) {
    try {
      const addedTechId = await makeRequest(
        {url: 'techs', body: newTech, method: 'post'},
        'Technology added',
      );
      newTech.id = addedTechId;
      setTechs([...techs, newTech].sort((a, b) => a.degree > b.degree));
      setShowNewForm(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.techsSection}>
      <h3>Some technologies i&apos;m familiar with</h3>
      {loading || (
        <div ref={techsContainer} onWheel={onWheel} className={styles.techsContainer}>
          {techs.map((t, i) => (
            <TechItem tech={t} index={i} key={t.id} ref={techImg} />
          ))}
          {techs.map((t, i) => (
            <TechItem tech={t} index={i} key={t.id} ref={techImg} />
          ))}
        </div>
      )}
      {showNewForm && <TechForm handleSubmit={addTech} />}
      {loggedIn && (
        <div onClick={() => setShowNewForm(ps => !ps)} className={styles.addButton}>
          <Button>Add tech</Button>
        </div>
      )}
    </div>
  );
}
