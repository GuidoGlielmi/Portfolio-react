import LoadingIcon from './LoadingIcon';
import styles from './GlobalLoading.module.css';

const GlobalLoading = () => (
  <div className={styles.globalLoadingBackground}>
    <div>
      <LoadingIcon />
    </div>
  </div>
);
export default GlobalLoading;
