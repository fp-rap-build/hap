import React from 'react';
import { Button } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import styles from '../../../../styles/pages/programs.module.css';

export default function Actions({ openAddProgramModal }) {
  return (
    <div className={styles.actions}>
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
