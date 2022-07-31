import styles from './DropDownIcon.module.css';

const DropDownIcon = ({onClick}) => (
  <div onClick={onClick} className={styles.dropDown}>
    <div className={styles.arrow}>
      <div className={styles.dropDownLeftSide} />
      <div className={styles.dropDownRightSide} />
    </div>
    <div className={styles.shadow}>
      <div className={styles.shadowLeft} />
      <div className={styles.shadowRight} />
    </div>
  </div>
);
export default DropDownIcon;
