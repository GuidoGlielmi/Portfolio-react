import styles from './Footer.module.css';

export default function Footer({ sections, setLinkIndex, scrollToSection }) {
  return (
    <footer>
      <ul className={styles.linkList}>
        {sections.map((s, i) => (
          <li
            onClick={() => {
              setLinkIndex(i);
              scrollToSection();
            }}
            key={i}
            className={styles.link}
          >
            {s}
          </li>
        ))}
      </ul>
    </footer>
  );
}
