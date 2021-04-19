import React from 'react';

import Dash from './components/Dash';
import styles from '../../../styles/pages/admin.module.css';

export default function Index() {
  return (
    <div className={styles.container}>
      <Dash />
    </div>
  );
}
