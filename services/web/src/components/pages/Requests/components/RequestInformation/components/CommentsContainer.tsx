import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import Comments from '../../../../../common/Comments';

import { Collapse, message } from 'antd';

import socket from '../../../../../../config/socket';
import { axiosWithAuth } from '../../../../../../api/axiosWithAuth';

const { Panel } = Collapse;

const CommentsContainer = ({ request }) => {
  const { currentUser } = useSelector(state => state.user);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments(request.id, setComments);
  }, []);

  useEffect(() => {
    socket.emit('joinChat', request.id);

    socket.on('comment', comment => {
      setComments(prevState => {
        return [...prevState, comment];
      });
    });

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
          notification={`${currentUser.firstName} left a comment on ${request.firstName}'s request`}
        />
      </Panel>
      <Panel header="Internal Comments" key="2">
        <Comments
          request={request}
          comments={comments}
          setComments={setComments}
          category="internal"
          notification={`${currentUser.firstName} left a comment on ${request.firstName}'s request`}
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
