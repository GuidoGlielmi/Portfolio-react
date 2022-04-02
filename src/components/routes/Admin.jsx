import React, { useRef, useState } from 'react';
import Header from 'components/header/Header';
import NavBar from 'components/nav-bar/NavBar';
import Footer from 'components/footer/Footer';
import TechsAndInfo from 'components/techs-and-info/TechsAndInfo';
import Projects from 'components/projects/Projects';
import Education from 'components/education/Education';
import Experiences from 'components/experiences/Experiences';
import Skills from 'components/skills/Skills';
import styles from './Admin.module.css';
export default function Admin() {
  const sections = [<TechsAndInfo />, <Projects />, <Experiences />, <Education />, <Skills />];
  const sectionsNames = [
    'Personal info',
    'Projects',
    'My experiences',
    'My education',
    'My skills',
  ];
  const [index, setIndex] = useState(0);
  const section = useRef('');
  function scrollToSection() {
    section.current.scrollIntoView();
  }
  function previousSection() {
    if (index === 0) setIndex(sections.length - 1);
    else setIndex(index - 1);
    scrollToSection();
  }
  function nextSection() {
    if (index === sections.length - 1) setIndex(0);
    else setIndex(index + 1);
    scrollToSection();
  }
  return (
    <>
      <div className={styles.responseMsgContainer}>
        <p className={styles.responseMsg}></p>
        <button onClick={() => ''} class={styles.closeResponseModal}>
          X
        </button>
      </div>
      <NavBar />
      <Header />
      <div ref={section} className={styles.bottomPart}>
        <div className={styles.sectionLinks}>
          {sectionsNames.map((sn, i) => (
            <span
              onClick={() => {
                setIndex(i);
              }}
              className={`${styles.sectionLink} ${index === i ? styles.clickedSectionLink : ''}`}
            >
              {sn}
            </span>
          ))}
        </div>
        <div className={styles.sectionsContainer}>
          <div className={styles.section}>
            <div className={styles.previousArrowContainer}>
              <div onClick={() => previousSection()} className={styles.previousArrow}>
                &lt;
              </div>
            </div>
            {sections[index]}
            <div className={styles.nextArrowContainer}>
              <div onClick={() => nextSection()} className={styles.nextArrow}>
                &gt;
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer setLinkIndex={setIndex} scrollToSection={scrollToSection} />
    </>
  );
}
