import React, { useState, useEffect } from 'react';
import styles from './ProgressRing.module.css';

export default function ProgressRing({ percentage = 100 }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const radius = 7;
  const strokeWidth = radius / 3;
  let diameter = 2 * radius + strokeWidth;
  let circumference = screenWidth * (radius / 100) * 2 * Math.PI;
  let offset = (circumference * (100 - percentage)) / 100;
  let cxy = radius + strokeWidth / 2;
  let vwh = 'vw';
  if (screenWidth > 650) {
    vwh = 'vw';
    circumference = screenWidth * (radius / 100) * 2 * Math.PI;
  } else {
    vwh = 'vh';
    circumference = screenHeight * (radius / 100) * 2 * Math.PI;
  }
  diameter = 2 * radius + strokeWidth;
  cxy = radius + strokeWidth / 2;
  offset = (circumference * (100 - percentage)) / 100;
  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);
  function handleResize() {
    setScreenHeight(window.innerHeight);
    setScreenWidth(window.innerWidth);
    if (window.innerWidth > 650) {
      vwh = 'vw';
      circumference = screenWidth * (radius / 100) * 2 * Math.PI;
    } else {
      vwh = 'vh';
      circumference = screenHeight * (radius / 100) * 2 * Math.PI;
    }
    diameter = 2 * radius + strokeWidth;
    cxy = radius + strokeWidth / 2;
    offset = (circumference * (100 - percentage)) / 100;
    console.log(diameter, offset);
  }
  return (
    <div className={styles.circleBox}>
      <p className={styles.percentage}>{percentage}%</p>
      <svg className={styles.circleContainer}>
        <circle
          className={styles.grayCircle}
          strokeWidth={`${strokeWidth}${vwh}`}
          fill='transparent'
          r={`${radius}${vwh}`}
          cx={`${cxy}${vwh}`}
          cy={`${cxy}${vwh}`}
        />
        <circle
          className={styles.circle}
          strokeWidth={`${strokeWidth}${vwh}`}
          fill='transparent'
          r={`${radius}${vwh}`}
          cx={`${cxy}${vwh}`}
          cy={`${cxy}${vwh}`}
          strokeDasharray={`${circumference}px`}
          strokeDashoffset={`${offset}px`}
        />
      </svg>
    </div>
  );
}
