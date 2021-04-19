import Comments from '../../../../../common/Comments';

import styles from '../../../../../../styles/pages/home.module.css';

import { Typography } from 'antd';

const { Title } = Typography;

const CommentsContainer = ({ request }) => {
  return (
    <div className={styles.commentsWrapper}>
      <Title level={4}> Request Comments: </Title>
      <Comments request={request} category="external" />
    </div>
  );
};

export default CommentsContainer;
