import React, { useState } from 'react';
import styles from './Button.module.css';
export default function Button({ children }) {
  const [buttonPressed, setButtonPressed] = useState(false);
  return (
    <button
      onPointerDown={() => setButtonPressed(!buttonPressed)}
      onPointerUp={() => setButtonPressed(!buttonPressed)}
      className={!buttonPressed ? styles.button : `${styles.buttonPressed} ${styles.button}`}
    >
      {children}
    </button>
  );
}
