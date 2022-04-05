import React, { useState, useEffect } from 'react';
import styles from './ProgressRing.module.css';

export default function ProgressRing({ percentage = 100 }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const sizeMultiplier = screenWidth > 650 ? 1 : 3;
  const radius = 7 * sizeMultiplier;
  const strokeWidth = radius / 3;
  const diameter = radius * 2 + strokeWidth;
  let circumference = screenWidth * (radius / 100) * 2 * Math.PI;
  let offset = (circumference * (100 - percentage)) / 100;
  let cxy = radius + strokeWidth / 2;
  circumference = screenWidth * (radius / 100) * 2 * Math.PI;
  cxy = radius + strokeWidth / 2;
  offset = (circumference * (100 - percentage)) / 100;

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  function debounce(fn, ms) {
    let timer;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        fn.apply(this, arguments);
      }, ms);
    };
  }
  const handleResize = debounce(() => setScreenWidth(window.innerWidth), 100);
  return (
    <div className={styles.circleBox}>
      <p className={styles.percentage}>{percentage}%</p>
      <svg className={styles.circleContainer} width={`${diameter}vw`} height={`${diameter}vw`}>
        <circle
          className={styles.grayCircle}
          strokeWidth={`${strokeWidth}vw`}
          fill='transparent'
          r={`${radius}vw`}
          cx={`${cxy}vw`}
          cy={`${cxy}vw`}
        />
        <circle
          className={styles.circle}
          strokeWidth={`${strokeWidth}vw`}
          fill='transparent'
          r={`${radius}vw`}
          cx={`${cxy}vw`}
          cy={`${cxy}vw`}
          strokeDasharray={`${circumference}px`}
          strokeDashoffset={`${offset}px`}
        />
      </svg>
    </div>
  );
}
