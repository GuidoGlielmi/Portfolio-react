import React from 'react';
import LoadingIcon from './LoadingIcon';
import styles from './GlobalLoading.module.css';
export default function GlobalLoading() {
  return (
    <div className={styles.globalLoadingBackground}>
      <div className={styles.loadingIcon}>
        <LoadingIcon></LoadingIcon>
      </div>
    </div>
  );
}
