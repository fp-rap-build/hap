import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import styles from '../../styles/common/loader.module.css';

const antIcon = <LoadingOutlined style={{ fontSize: 34 }} spin />;

export default function LoadingComponent() {
  return (
    <div className={styles.container}>
      <Spin indicator={antIcon} />
    </div>
  );
}
