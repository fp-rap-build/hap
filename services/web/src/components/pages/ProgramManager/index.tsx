import React from 'react';
import styles from '../../../styles/pages/admin.module.css';
import Dash from './components/Dash';

export default function Index() {
  return (
    <div className={styles.container}>
      <Dash />
    </div>
  );
}
