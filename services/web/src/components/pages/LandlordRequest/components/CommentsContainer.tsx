import { useState, useEffect } from 'react';

import socket from '../../../../config/socket';

import { axiosWithAuth } from '../../../../api/axiosWithAuth';

import Comments from '../../../common/Comments';

import { message } from 'antd';

export default function CommentsContainer({ request, currentUser }) {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      let comments = await axiosWithAuth()
        .get(`/requests/${request.id}/comments`)
        .then(res => res.data.comments);
      setComments(comments);
    } catch (error) {
      message.error('Unable to fetch comments');
    }
  };

  useEffect(() => {
    fetchComments();
    //eslint-diasble-next-line
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
    <div className="commentsContainer">
      <Comments
        request={request}
        comments={comments}
        setComments={setComments}
        category="external"
        notification={`${currentUser.firstName} left a comment on ${request.firstName}'s request`}
      />
    </div>
  );
}
