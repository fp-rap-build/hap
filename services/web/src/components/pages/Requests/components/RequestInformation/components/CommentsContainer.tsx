import { useEffect, useState } from 'react';

import Comments from '../../../../../common/Comments';

import { Collapse, message } from 'antd';

import socket from '../../../../../../config/socket';
import { axiosWithAuth } from '../../../../../../api/axiosWithAuth';

const { Panel } = Collapse;

const CommentsContainer = ({ request }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments(request.id, setComments);
  }, []);

  useEffect(() => {
    socket.emit('joinChat', request.id);

    socket.on('comment', comment => {});

    return () => {
      socket.emit('leaveChat', request.id);
    };
  }, []);

  return (
    <Collapse defaultActiveKey={['1']}>
      <Panel header="Applicant Comments" key="1">
        <Comments
          request={request}
          comments={comments}
          setComments={setComments}
          category="external"
        />
      </Panel>
      <Panel header="Internal Comments" key="2">
        <Comments
          request={request}
          comments={comments}
          setComments={setComments}
          category="internal"
        />
      </Panel>
    </Collapse>
  );
};

const fetchComments = async (requestId, setComments) => {
  try {
    let comments = await axiosWithAuth()
      .get(`/requests/${requestId}/comments`)
      .then(res => res.data.comments);
    setComments(comments);
  } catch (error) {
    message.error('Unable to fetch comments');
  }
};

export default CommentsContainer;
