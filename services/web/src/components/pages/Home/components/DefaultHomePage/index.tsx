import { useSelector } from 'react-redux';

import { Typography } from 'antd';

import styles from '../../../../../styles/pages/home.module.css';

import StatusBar from './components/StatusBar';
import DocumentUploader from './components/DocumentUploader';
import CommentsContainer from './components/CommentsContainer';

export default function Index() {
  const currentUser = useSelector(state => state.user.currentUser);

  const request = currentUser.requests[0];

  return (
    <>
      <Typography.Title
        level={2}
        className={styles.heading}
        style={{ color: '#FFFFFF' }}
      >
        {' '}
        Hi {currentUser.firstName}, Welcome to the Family Promise Rental
        Assistance Program
      </Typography.Title>

      <div className={styles.container}>
        <StatusBar request={request} />
        {request && <CommentsContainer request={request} />}
        <DocumentUploader request={request} />
      </div>
    </>
  );
}
