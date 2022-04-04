import styles from './Footer.module.css';

export default function Footer({ sections, setLinkIndex, scrollToSection }) {
  return (
    <footer>
      <ul className={styles.linkList}>
        {sections.map((s, i) => (
          <li
            onClick={() => {
              setLinkIndex(0);
              scrollToSection();
            }}
            key={i}
            className={styles.link}
          >
            {s}
          </li>
        ))}
      </ul>
    </footer>
  );
}
/*
  const duration = 300;
 const defaultStyle = {
    transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
    opacity: 0,
    width: '200px',
    position: 'absolute',
  };
  const defaultExitingStyle = { ...defaultStyle, opacity: 1 };

  const enteringTransitionStyles = {
    entering: { opacity: 0, transform: 'translate(-100%)' },
    entered: { opacity: 1, transform: 'translate(15%)' },
    exiting: { opacity: 1, transform: 'translate(15%)' },
    exited: { opacity: 1, transform: 'translate(0)' },
  };
  const exitingTransitionStyles = {
    // entering is the process from the initial point to the entering point
    entering: { opacity: 0, transform: 'translate(100%)' },
    entered: { opacity: 0, transform: 'translate(-100%)' },
    exiting: { opacity: 0, transform: 'translate(-100%)' },
    exited: { opacity: 0, transform: 'translate(-100%)' },
  };  
  {elements.map((e, i) => (
        <div>
          <Transition
            in={stateArray[index]}
            onEntered={() => {
              stateArray[index] = false;
              setStateArray([...stateArray]);
            }}
            key={i}
            timeout={duration}
          >
            {(state) => {
              return (
                <div
                  style={
                    index === i
                      ? {
                          ...defaultStyle,
                          ...enteringTransitionStyles[state],
                        }
                      : {
                          ...defaultExitingStyle,
                          ...exitingTransitionStyles[state],
                        }
                  }
                >
                  {e}
                </div>
              );
            }}
          </Transition>
        </div>
      ))}
      <button
        type='button'
        onClick={() => {
          if (index === elements.length - 1) {
            setIndex(0);
            stateArray[0] = true;
            setStateArray([...stateArray]);
          } else {
            setIndex(index + 1);
            stateArray[index + 1] = true;
            setStateArray([...stateArray]);
          }
        }}
      >
        Click
      </button> 
  */
