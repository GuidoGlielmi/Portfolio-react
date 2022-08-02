/* eslint-disable react/no-array-index-key */
import {useEffect, useRef, useState} from 'react';
import {CSSTransition} from 'react-transition-group';
import Header from 'components/header/Header';
import NavBar from 'components/nav-bar/NavBar';
import Footer from 'components/footer/Footer';
import TechsAndInfo from 'components/techs-and-info/TechsAndInfo';
import Projects from 'components/projects/Projects';
import Education from 'components/education/Education';
import Experiences from 'components/experiences/Experiences';
import Skills from 'components/skills/Skills';
import CircleButton from 'components/button/CircleButton';
import './Admin.css';
import styles from './Admin.module.css';

const sectionsNames = ['Who am I', 'Projects', 'Experiences', 'My education', 'My skills'];
const sections = [<TechsAndInfo />, <Projects />, <Experiences />, <Education />, <Skills />];

export default function Admin() {
  const [index, setIndex] = useState(0);

  const section = useRef('');
  const previousIndex = useRef(0);

  useEffect(() => {
    section.current.scrollIntoView();
  }, [index]);

  const previousSection = () => setIndex(!index ? sections.length - 1 : index - 1);
  const nextSection = () => setIndex(index === sections.length - 1 ? 0 : index + 1);

  useEffect(() => (previousIndex.current = index), [index]);

  return (
    <>
      <NavBar />
      <Header />
      <div className={styles.main} style={{position: 'relative'}}>
        <div>
          <Arrow action={previousSection} />
          <Arrow action={nextSection} />
        </div>
        <div ref={section} className={styles.bottomPart}>
          <SectionLinks index={index} setIndex={setIndex} />
          <Sections sections={sections} index={index} previousIndex={previousIndex} />
        </div>
        <Footer sections={sectionsNames} setLinkIndex={setIndex} />
      </div>
    </>
  );
}

const SectionLinks = ({index, setIndex}) => (
  <div className={styles.sectionLinks}>
    {sectionsNames.map((sn, i) => (
      <span
        key={sn}
        onClick={() => setIndex(i)}
        className={`${styles.sectionLink} ${index === i && styles.clickedSectionLink}`}
      >
        {sn}
      </span>
    ))}
  </div>
);

const Arrow = ({action}) => (
  <div>
    <div>
      <CircleButton action={action}>
        <img style={{width: '100%'}} src='./assets/icons/arrow.png' alt='Previous section arrow' />
      </CircleButton>
    </div>
  </div>
);
const Sections = ({sections, index, previousIndex}) => (
  <div className={styles.sectionsContainer}>
    <div className={styles.section}>
      {sections.map((s, i) => (
        <CSSTransition
          key={i}
          in={index === i}
          timeout={650}
          classNames={previousIndex.current > index ? 'next' : 'previous'}
          unmountOnExit
        >
          {s}
        </CSSTransition>
      ))}
    </div>
  </div>
);

/* <div className={styles.previousArrowContainer}>
  <div className={`${styles.previousArrow} ${styles.flip}`}>
    <CircleButton action={previousSection}>
      <img
        style={{width: '100%'}}
        src='./assets/icons/arrow.png'
        alt='Previous section arrow'
      />
    </CircleButton>
  </div>
</div> 
<div className={styles.nextArrowContainer}>
  <div className={styles.previousArrow}>
    <CircleButton action={nextSection}>
      <img
        style={{width: '100%'}}
        src='./assets/icons/arrow.png'
        alt='Previous section arrow'
      />
    </CircleButton>
  </div>
</div> */
