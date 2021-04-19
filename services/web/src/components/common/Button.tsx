import React from 'react';

import styles from '../../styles/common/button.module.css';

export default function Button(props) {
  return (
    <button onClick={props.onClick} className={styles.btn}>
      {props.children}
    </button>
  );
}
