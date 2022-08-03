import styles from './Button.module.css';

const Button = ({size, children}) => (
  <button className={`${styles.button} ${styles[size]}`}>{children}</button>
);
export default Button;
