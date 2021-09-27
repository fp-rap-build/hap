import { Steps, Typography } from 'antd';

import {
  FileDoneOutlined,
  AuditOutlined,
  FolderOpenOutlined,
} from '@ant-design/icons';

import useMediaQuery from '@material-ui/core/useMediaQuery';

import styles from '../../../../../styles/pages/statusBar.module.css';

const { Step } = Steps;

const StatusBar = ({ request }) => {
  const isMobile = useMediaQuery('(min-width:700px)');

  const statusToNum = status => {
    switch (status) {
      case 'received':
        return 0;
      case 'notResponding':
        return 0;
      case 'documentsNeeded':
        return 0;
      case 'verifyingDocuments':
        return 1;
      case 'readyForReview':
        return 1;
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

  const decisionDescription = status => {
    if (status === 'approved') {
      return 'Approved - Check e-mail for next steps';
    } else if (status === 'denied') {
      return 'Denied - Check e-mail for next steps';
    } else {
      return 'Pending review from Housing Assistance Team';
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
          title="Document Collection"
          description="Your application has been started and will soon be ready for review by our Housing Assistance Team; please begin uploading any documentation by clicking on the 'Documents' tab on the sidebar.  We cannot begin processing your request until all documents have been submitted."
        />
        <Step
          icon={<FolderOpenOutlined />}
          title="Verification of Documentation"
          description="We have received your application for assistance. Please allow 4-6 weeks for your application to be processed. We will reach out to you with further instructions.  If you have any questions, please direct them to support@familypromiseofspokane.org."
        />
        <Step
          icon={<AuditOutlined />}
          title="Ready for Decision"
          description={decisionDescription(request?.requestStatus)}
        />
      </Steps>
    </div>
  );
};

// const statusTexts = {
//   notResponding: {
//     title: 'Not Responding',
//     description:
//       "Your request has been moved to 'Not Responding' - please contact us in the 'Chat with us!' tab of your dashboard to resume the application process.",
//   },
//   documentsNeeded: {
//     title: 'Document Collection',
//     description:
//       "Your application has been started and will soon be ready for review by our Housing Assistance Team; please begin uploading any documentation by clicking on the 'Documents' tab on the sidebar.  We cannot begin processing your request until all documents have been submitted.",
//   },
//   verifyingDocuments: {
//     title: 'Verification of Documentation',
//     description:
//       'Your application is being reviewed by the Housing Assistance Team, please check back often to see if any further action is needed or if specific documents are required.',
//   },
// };

export default StatusBar;
