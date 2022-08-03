import {useContext, useEffect, useRef, useState} from 'react';
import {loginContext} from 'components/contexts/login/LoginContext';
import {userFeedbackContext} from 'components/contexts/user-feedback/UserFeedbackContext';
import {userContext} from 'components/contexts/user/UserContext';
import TechForm from 'components/forms/techs/TechForm';
import Button from 'components/button/Button';
import TechItem from './TechItem';
import styles from './Techs.module.css';

export default function Techs() {
  const {techs, setTechs, loadingTechs} = useContext(userContext);
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
    const maxValue = techsContainer.current.scrollLeftMax;
    const totalWidth = techsContainer.current.scrollWidth;
    if (e.deltaY > 0) {
      if (maxValue - currentValue < scrollUnit) {
        techsContainer.current.style['scroll-behavior'] = 'auto';
        techsContainer.current.scrollLeft = currentValue - totalWidth / 2;
        techsContainer.current.style['scroll-behavior'] = 'smooth';
        techsContainer.current.scrollLeft = currentValue - totalWidth / 2 + scrollUnit;
      } else {
        techsContainer.current.scrollLeft = currentValue + scrollUnit;
      }
    } else if (currentValue - scrollUnit < scrollUnit) {
      techsContainer.current.style['scroll-behavior'] = 'auto';
      techsContainer.current.scrollLeft = currentValue - totalWidth / 2;
      techsContainer.current.style['scroll-behavior'] = 'smooth';
      techsContainer.current.scrollLeft = totalWidth / 2 + Math.abs(currentValue - scrollUnit);
    } else {
      techsContainer.current.scrollLeft = currentValue - scrollUnit;
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
      {loadingTechs || (
        <div ref={techsContainer} onWheel={onWheel} className={styles.techsContainer}>
          <TechList techs={techs} techImg={techImg} setTechs={setTechs} />
          <TechList techs={techs} techImg={techImg} setTechs={setTechs} />
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

const TechList = ({techs, techImg}) =>
  techs.map((t, i) => (
    <div key={t.id} ref={techImg} /* style={{scrollSnapAlign: 'start'}} */>
      <TechItem tech={t} index={i} />
    </div>
  ));
