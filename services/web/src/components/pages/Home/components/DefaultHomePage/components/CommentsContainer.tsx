import { useState } from 'react';

import Comments from '../../../../../common/Comments';

import styles from '../../../../../../styles/pages/home.module.css';

import { Typography } from 'antd';

const { Title } = Typography;

const CommentsContainer = ({ request }) => {
  const [comments, setComments] = useState([]);

  return (
    <div className={styles.commentsWrapper}>
      <Title level={4}> Request Comments: </Title>
      <Comments
        request={request}
        comments={comments}
        setComments={setComments}
        category="external"
      />
    </div>
  );
};

export default CommentsContainer;
