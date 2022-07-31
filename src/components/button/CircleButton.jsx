import {useState} from 'react';
import {SwitchTransition, CSSTransition} from 'react-transition-group';
import styles from './CircleButton.module.css';

export default function CircleButton({action, children}) {
  const [pressed, setPressed] = useState(false);
  function trigger() {
    setPressed(ps => !ps);
    action();
  }
  return (
    <SwitchTransition>
      <CSSTransition key={pressed} timeout={100} classNames={{...styles}}>
        <div className={styles.button} onClick={trigger}>
          {children}
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
}
