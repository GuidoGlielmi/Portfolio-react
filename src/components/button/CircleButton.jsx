import styles from './CircleButton.module.css';

export default function CircleButton({action, children}) {
  return (
    <div className={styles.button} onClick={action}>
      {children}
    </div>
  );
}
