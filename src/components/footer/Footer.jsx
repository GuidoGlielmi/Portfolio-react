/* eslint-disable react/no-array-index-key */
import styles from './Footer.module.css';

const Footer = ({sections, setLinkIndex}) => (
  <footer>
    <ul className={styles.linkList}>
      {sections.map((s, i) => (
        <li onClick={() => setLinkIndex(i)} key={s}>
          {s}
        </li>
      ))}
    </ul>
    <a href='mailto:guidoglielmi@gmail.com' target='_blank' rel='noreferrer'>
      <address>guidoglielmi@gmail.com</address>
    </a>
  </footer>
);
export default Footer;
