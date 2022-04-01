import React from 'react';
import styles from './Footer.module.css';
export default function Footer({ setLinkIndex, scrollToSection }) {
  return (
    <footer>
      <ul className={styles.linkList}>
        <li
          onClick={() => {
            setLinkIndex(0);
            scrollToSection();
          }}
          className={styles.link}
        >
          Who am I
        </li>
        <li
          onClick={() => {
            setLinkIndex(1);
            scrollToSection();
          }}
          className={styles.link}
        >
          My projects
        </li>
        <li
          onClick={() => {
            setLinkIndex(2);
            scrollToSection();
          }}
          className={styles.link}
        >
          My experiences
        </li>
        <li
          onClick={() => {
            setLinkIndex(3);
            scrollToSection();
          }}
          className={styles.link}
        >
          My education
        </li>
        <li
          onClick={() => {
            setLinkIndex(4);
            scrollToSection();
          }}
          className={styles.link}
        >
          Soft &amp; Hard skills
        </li>
      </ul>
    </footer>
  );
}
