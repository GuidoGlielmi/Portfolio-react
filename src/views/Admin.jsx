import {useRef, useState} from 'react';
import {CSSTransition, SwitchTransition} from 'react-transition-group';
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
  const [state, setState] = useState(true);

  const section = useRef('');

  function scrollIntoView(i) {
    section.current.scrollIntoView();
    triggerAnimation(i);
  }
  function triggerAnimation(i) {
    if (index === i) return;
    setState(ps => !ps);
    setIndex(i);
  }
  const previousSection = () => triggerAnimation(!index ? sections.length - 1 : index - 1);
  const nextSection = () => triggerAnimation(index === sections.length - 1 ? 0 : index + 1);

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
          <SectionLinks index={index} triggerAnimation={triggerAnimation} />
          <Sections section={section} state={state} index={index} />
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

const SectionLinks = ({index, triggerAnimation}) => (
  <div className={styles.sectionLinks}>
    {sectionsNames.map((sn, i) => (
      <span
        key={sn}
        onClick={() => triggerAnimation(i)}
        className={index === i ? styles.clickedSectionLink : undefined}
      >
        {sn}
      </span>
    ))}
  </div>
);

const Sections = ({index, section, state}) => (
  <div ref={section} className={styles.sectionsContainer}>
    <SwitchTransition>
      <CSSTransition
        key={state}
        addEndListener={(node, done) => {
          node.addEventListener('transitionend', done, false);
        }}
        classNames='fade'
      >
        {sections[index]}
      </CSSTransition>
    </SwitchTransition>
  </div>
);
