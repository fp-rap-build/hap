import React from 'react';

import styles from '../../styles/common/card.module.css';

export default function Card(props) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{props.value}</h3>
      <h4 className={styles.title}>{props.title}</h4>
    </div>
  );
}
