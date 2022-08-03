/* eslint-disable react/no-array-index-key */
import styles from './Footer.module.css';

const Footer = ({sections, setLinkIndex}) => (
  <footer>
    <ul className={styles.linkList}>
      {sections.map((s, i) => (
        <li onClick={() => setLinkIndex(i)} key={s} /* className={styles.link} */>
          {s}
        </li>
      ))}
    </ul>
    <address>guidoglielmi@gmail.com</address>
  </footer>
);
export default Footer;
