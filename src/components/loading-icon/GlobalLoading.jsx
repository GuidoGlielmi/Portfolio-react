import LoadingIcon from './LoadingIcon';
import styles from './GlobalLoading.module.css';

const GlobalLoading = () => (
  <div className={styles.globalLoadingBackground}>
    <LoadingIcon />
  </div>
);
export default GlobalLoading;
