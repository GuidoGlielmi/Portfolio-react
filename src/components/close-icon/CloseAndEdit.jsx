/* eslint-disable react/jsx-no-useless-fragment */
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';
import styles from './CloseAndEdit.module.css';

export default function CloseAndEdit({toggleEdit, deleteItem}) {
  return (
    <div className={styles.container}>
      <div onClick={deleteItem}>
        <FontAwesomeIcon className={`${styles.icon} ${styles.close}`} icon={solid('xmark')} />
      </div>
      <div onClick={toggleEdit}>
        <FontAwesomeIcon className={styles.icon} icon={solid('pen-to-square')} />
      </div>
    </div>
  );
}
export function Edit({toggleEdit}) {
  return (
    <div className={styles.container}>
      <div onClick={toggleEdit}>
        <FontAwesomeIcon className={styles.icon} icon={solid('pen-to-square')} />
      </div>
    </div>
  );
}
