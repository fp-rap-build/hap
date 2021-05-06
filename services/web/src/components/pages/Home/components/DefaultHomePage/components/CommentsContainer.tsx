import { useState, useEffect } from 'react';

import Comments from '../../../../../common/Comments';

import styles from '../../../../../../styles/pages/home.module.css';

import { message, Typography } from 'antd';

import socket from '../../../../../../config/socket';
import { axiosWithAuth } from '../../../../../../api/axiosWithAuth';

const { Title } = Typography;

const CommentsContainer = ({ request }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments(request.id, setComments);
  }, []);

  useEffect(() => {
    socket.emit('joinChat', request.id);

    return () => {
      socket.emit('leaveChat', request.id);
    };
  }, []);

  useEffect(() => {
    socket.on('comment', comment => {
      setComments(prevState => {
        return [...prevState, comment];
      });
    });
  }, []);

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

const fetchComments = async (requestId, setComments) => {
  try {
    let comments = await axiosWithAuth()
      .get(`/requests/${requestId}/comments`)
      .then(res => res.data.comments);

    setComments(comments);
  } catch (error) {
    message.error('Unable to retrieve comments');
  }
};

export default CommentsContainer;
