/* eslint-disable react/no-array-index-key */
import {useEffect, useRef, useState} from 'react';
import {CSSTransition} from 'react-transition-group';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';
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

  function scrollIntoView(i) {
    section.current.scrollIntoView();
    setIndex(i);
  }

  const previousSection = () => setIndex(!index ? sections.length - 1 : index - 1);
  const nextSection = () => setIndex(index === sections.length - 1 ? 0 : index + 1);

  useEffect(() => (previousIndex.current = index), [index]);

  return (
    <>
      <NavBar />
      <Header />
      <main className={styles.main}>
        <div>
          <Arrow action={previousSection} />
          <Arrow action={nextSection} />
        </div>
        <div className={styles.bottomPart}>
          <SectionLinks index={index} setIndex={setIndex} />
          <Sections
            sections={sections}
            section={section}
            index={index}
            previousIndex={previousIndex}
          />
        </div>
        <Footer sections={sectionsNames} setLinkIndex={scrollIntoView} />
      </main>
    </>
  );
}

const Arrow = ({action}) => (
  <div className={styles.arrowTrack}>
    <div>
      <CircleButton action={action}>
        <FontAwesomeIcon style={{color: 'white'}} icon={solid('arrow-right')} />
      </CircleButton>
    </div>
  </div>
);

const SectionLinks = ({index, setIndex}) => (
  <div className={styles.sectionLinks}>
    {sectionsNames.map((sn, i) => (
      <span
        key={sn}
        onClick={() => setIndex(i)}
        className={index === i && styles.clickedSectionLink}
      >
        {sn}
      </span>
    ))}
  </div>
);

const Sections = ({sections, index, previousIndex, section}) => (
  <div ref={section} className={styles.sectionsContainer}>
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
);
