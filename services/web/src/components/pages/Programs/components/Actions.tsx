import React from 'react';

import { useHistory } from 'react-router-dom';

import { Button } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import styles from '../../../../styles/pages/programs.module.css';

export default function Actions({ openAddProgramModal }) {
  const history = useHistory();

  const goBackToOrgs = () => history.goBack();

  return (
    <div className={styles.actions}>
      <Button onClick={goBackToOrgs} size="large">
        Return to dash
      </Button>
      <Button
        onClick={openAddProgramModal}
        size="large"
        color="primary"
        type="primary"
      >
        <PlusOutlined /> New Program
      </Button>
    </div>
  );
}
