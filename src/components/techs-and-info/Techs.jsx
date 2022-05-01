import React, { useContext, useEffect, useRef, useState } from 'react';
import TechItem from './TechItem';
import TechForm from 'components/forms/techs/TechForm';
import Button from 'components/button/Button';
import styles from './Techs.module.css';
import { InfoContext } from 'App';
import LoadingIcon from 'components/loading-icon/LoadingIcon';
export default function Techs() {
  const techs = useContext(InfoContext).techs;
  const loggedIn = useContext(InfoContext).loggedIn;
  const [showNewForm, setShowNewForm] = useState(false);
  const techImg = useRef('');
  const techsContainer = useRef('');
  useEffect(() => {
    if (!loggedIn) {
      setShowNewForm(false);
    }
  }, [loggedIn]);
  function onWheel(e) {
    let scrollUnit = techImg.current.offsetWidth;
    let currentValue = techsContainer.current.scrollLeft;
    let maxValue = techsContainer.current.scrollLeftMax;
    let totalWidth = techsContainer.current.scrollWidth;
    console.log(scrollUnit, currentValue, maxValue, totalWidth, e.deltaY);
    console.log(maxValue - currentValue < scrollUnit);
    if (e.deltaY > 0) {
      if (maxValue - currentValue < scrollUnit) {
        console.log(techsContainer.current.scrollLeft);
        techsContainer.current.style['scroll-behavior'] = 'auto';
        techsContainer.current.scrollLeft = currentValue - totalWidth / 2;
        techsContainer.current.style['scroll-behavior'] = 'smooth';
        techsContainer.current.scrollLeft = currentValue - totalWidth / 2 + scrollUnit;
      } else {
        techsContainer.current.scrollLeft = currentValue + scrollUnit;
        console.log(techsContainer.current.scrollLeft);
      }
    } else {
      if (currentValue - scrollUnit < scrollUnit) {
        techsContainer.current.style['scroll-behavior'] = 'auto';
        techsContainer.current.scrollLeft = currentValue - totalWidth / 2;
        techsContainer.current.style['scroll-behavior'] = 'smooth';
        techsContainer.current.scrollLeft = totalWidth / 2 + Math.abs(currentValue - scrollUnit);
      } else {
        techsContainer.current.scrollLeft = currentValue - scrollUnit;
      }
    }
  }
  return techs ? (
    <div className={styles.techsSection}>
      <p className={`${styles.techsTitle} textShadowSemiDark`}>
        Some technologies i'm familiar with
      </p>
      <div ref={techsContainer} onWheel={(e) => onWheel(e)} className={styles.techsContainer}>
        {techs ? (
          techs.map((t, i) => (
            <div key={t.id} ref={techImg}>
              <TechItem t={t} i={i} />
            </div>
          ))
        ) : (
          <LoadingIcon />
        )}
        <div className={styles.extraTechs}>
          {techs &&
            techs.map((t, i) => (
              <div key={t.id} ref={techImg}>
                <TechItem t={t} i={i} />
              </div>
            ))}
        </div>
      </div>
      {showNewForm && <TechForm />}
      {loggedIn && (
        <div onClick={() => setShowNewForm(!showNewForm)} className={styles.addButton}>
          <Button>Add tech</Button>
        </div>
      )}
    </div>
  ) : (
    <LoadingIcon />
  );
}
