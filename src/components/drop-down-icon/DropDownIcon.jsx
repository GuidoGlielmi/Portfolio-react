import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styles from './DropDownIcon.module.css';

const DropDownIcon = ({onClick, size}) => (
  <div onClick={onClick} className={styles.dropDown}>
    <FontAwesomeIcon icon={solid('chevron-down')} size={size} />
  </div>
);
export default DropDownIcon;
