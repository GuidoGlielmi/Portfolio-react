import React, { useContext, useEffect, useRef, useState } from 'react';
import Header from 'components/header/Header';
import NavBar from 'components/nav-bar/NavBar';
import Footer from 'components/footer/Footer';
import TechsAndInfo from 'components/techs-and-info/TechsAndInfo';
import Projects from 'components/projects/Projects';
import Education from 'components/education/Education';
import Experiences from 'components/experiences/Experiences';
import Skills from 'components/skills/Skills';
import styles from './Admin.module.css';
import './Admin.css';
import { adminApi, loginApi, userApi } from 'index';
import { InfoContext } from 'App';
import LoginModal from 'components/login-modal/LoginModal';
import { CSSTransition } from 'react-transition-group';
export default function Admin() {
  const setLoggedIn = useContext(InfoContext).setLoggedIn;
  const user = useContext(InfoContext).users[0];

  const sections = [
    <TechsAndInfo user={user} i={0} />,
    <Projects />,
    <Experiences />,
    <Education />,
    <Skills />,
  ];
  const sectionsNames = ['Who am I', 'Projects', 'Experiences', 'My education', 'My skills'];

  const [responseMsg, setResponseMsg] = useState('');
  const [error, setError] = useState(false);
  const [showResponseMsg, setShowResponseMsg] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [index, setIndex] = useState(0);
  // const [previousIndex, setPreviousIndex] = useState(0);

  const modalBackground = useRef();
  const section = useRef('');
  const previousIndex = useRef(0);
  useEffect(() => (previousIndex.current = index), [index]);
  function scrollToSection() {
    section.current.scrollIntoView();
  }
  function previousSection() {
    if (index === 0) {
      // setPreviousIndex(index);
      setIndex(sections.length - 1);
      // previousIndex.current = sections.length;
    } else {
      // setPreviousIndex(index);
      setIndex(index - 1);
      // previousIndex.current = index;
    }
    // scrollToSection();
  }
  function nextSection() {
    if (index === sections.length - 1) {
      // setPreviousIndex(index);
      setIndex(0);
    } else {
      // setPreviousIndex(index);
      setIndex(index + 1);
    }
  }
  function showResponseMsgSuccess(data) {
    setResponseMsg(data);
    setError(false);
    setShowResponseMsg(true);
    setInterval(() => {
      setShowResponseMsg(false);
    }, 5000);
  }
  function showResponseMsgError(data) {
    setResponseMsg(data);
    setError(true);
    setShowResponseMsg(true);
  }

  useEffect(() => {
    loginApi.interceptors.response.use((res) => {
      showResponseMsgSuccess(res.data.msg);
      return res;
    });
    userApi.interceptors.response.use(
      (req) => req,
      ({ response }) => {
        if (response.data) {
          showResponseMsgError(response.data.message + ': ' + response.data.path);
        } else {
          showResponseMsgError(response.status + ' ' + response.statusText);
        }
        return ''; // continues despite the error
      },
    );
    adminApi.interceptors.response.use(
      // this function is the return for any request from the axios instance "api"
      // i.e api.get(...), api.post(...), etc
      (res) => {
        if (res.data) {
          showResponseMsgSuccess(res.data.msg);
        }
        return res;
      },
      (err) => {
        const res = err.response;
        console.log(res);
        if (res.data) {
          showResponseMsgError(`${res.data.error} '${res.data.message}' ${res.data.path}`);
        } else if (res.status === 403) {
          showResponseMsgError('Must be logged in to perform that action');
          setLoggedIn(false);
        } else {
          showResponseMsgError(res.status + ' ' + res.statusText);
        }
        return Promise.reject(err);
      },
    );
  }, [setResponseMsg, setLoggedIn]);

  return (
    <>
      <div
        ref={modalBackground}
        id='modalBackground'
        onClick={({ target: { id } }) =>
          id === modalBackground.current.id && setShowLoginModal(!showLoginModal)
        }
        className={`${styles.modalBackground} ${!showLoginModal && styles.modalBackgroundFade}`}
      >
        <LoginModal closeModal={() => setShowLoginModal(false)} />
      </div>
      <div
        className={`${!error ? styles.responseMsgContainer : styles.responseMsgErrorContainer} 
      ${!showResponseMsg && styles.responseMsgContainerFadeOut}`}
      >
        <p className={styles.responseMsg}>{responseMsg}</p>
        <button onClick={() => setShowResponseMsg(false)} className={styles.closeResponseModal}>
          X
        </button>
      </div>
      <NavBar
        u={user}
        i={0}
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
      />
      <Header user={user} i={0} />
      <div style={{ position: 'relative' }}>
        <div className={styles.previousArrowContainer}>
          <div onClick={() => previousSection()} className={styles.previousArrow}>
            &lt;
          </div>
        </div>
        <div className={styles.nextArrowContainer}>
          <div onClick={() => nextSection()} className={styles.nextArrow}>
            &gt;
          </div>
        </div>
        <div ref={section} className={styles.bottomPart}>
          <div className={styles.sectionLinks}>
            {sectionsNames.map((sn, i) => (
              <span
                key={i}
                onClick={() => {
                  // setPreviousIndex(index);
                  setIndex(i);
                }}
                className={`${styles.sectionLink} ${index === i && styles.clickedSectionLink}`}
              >
                {sn}
              </span>
            ))}
          </div>
          <div className={styles.sectionsContainer}>
            <div className={styles.section}>
              {sections.map((s, i) => {
                // console.log(previousIndex.current, 'prev', index, 'current');
                // console.log(i, index === i);
                return (
                  <CSSTransition
                    in={index === i}
                    timeout={1000}
                    classNames={previousIndex.current > index ? 'next-section' : 'previous-section'}
                    unmountOnExit
                  >
                    {s}
                  </CSSTransition>
                );
              })}
            </div>
          </div>
        </div>
        <Footer
          sections={sectionsNames}
          setLinkIndex={setIndex}
          scrollToSection={scrollToSection}
        />
      </div>
    </>
  );
}
