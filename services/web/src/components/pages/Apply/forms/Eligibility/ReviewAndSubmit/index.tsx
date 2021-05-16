import React from 'react';

import Basic from './cards/Basic';
import Household from './cards/Household';
import Demographics from './cards/Demographics';

import styles from '../../../../../../styles/pages/apply.module.css';

export default function Index({ formValues, setStep }) {
  let props = { formValues, setStep };

  return (
    <div className={styles.review}>
      <Basic step={0} {...props} />
      <Household step={1} {...props} />
      <Demographics step={2} {...props} />
    </div>
  );
}
