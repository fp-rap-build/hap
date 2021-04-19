import React from 'react';

import { Steps, Typography } from 'antd';
import {
  FileDoneOutlined,
  AuditOutlined,
  FolderOpenOutlined,
} from '@ant-design/icons';

import useMediaQuery from '@material-ui/core/useMediaQuery';

import styles from '../../../../../../styles/pages/statusBar.module.css';

const { Step } = Steps;

const StatusBar = ({ request }) => {
  const isMobile = useMediaQuery('(min-width:700px)');

  const statusToNum = status => {
    switch (status) {
      case 'received':
        return 0;
      case 'inReview':
        return 1;
      case 'approved':
        return 2;
      case 'denied':
        return 2;
      default:
        return null;
    }
  };

  const decsionDescription = status => {
    if (status === 'approved') {
      return 'Approved - Check e-mail for next steps';
    } else if (status === 'denied') {
      return 'Denied - Check e-mail for next steps';
    } else {
      return 'Pending review from Approval Team';
    }
  };

  return (
    <div className={styles.container}>
      <Typography.Title level={4} className={styles.heading}>
        Request Status:
      </Typography.Title>
      <br />
      <Steps
        current={statusToNum(request?.requestStatus)}
        className={styles.steps}
        direction={isMobile ? 'horizontal' : 'vertical'}
      >
        <Step
          icon={<FileDoneOutlined />}
          className={styles.completed}
          title="Received"
          description="Your application has been received by our Approval Team."
        />
        <Step
          icon={<FolderOpenOutlined />}
          title="In Review"
          description="Your application is being reviewed by our Approval Team"
        />
        <Step
          icon={<AuditOutlined />}
          title="Decision"
          description={decsionDescription(request?.requestStatus)}
        />
      </Steps>
    </div>
  );
};

export default StatusBar;
