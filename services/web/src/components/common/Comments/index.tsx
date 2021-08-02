import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { axiosWithAuth } from '../../../api/axiosWithAuth';
import { checkCommentLength } from './utils';

import RenderComment from './components/RenderComment';
import CreateComment from './components/CreateComment';
import NoComment from './components/NoComment';

import { Button } from 'antd';
import socket from '../../../config/socket';

const Comments = ({
  request,
  comments,
  notification,
  setComments,
  category,
}) => {
  const requestId = request.id;
  const [newComment, setNewComment] = useState({ text: '' });
  const [filteredComments, setFilteredComments] = useState([]);

  const currentUser = useSelector(state => state.user.currentUser);

  useEffect(() => {
    let filter = comments.filter(comment => {
      if (comment.category === category) return comment;
    });

    setFilteredComments(filter);
  }, [comments]);

  const addComment = async e => {
    e.stopPropagation();
    const commentToPOST = {
      requestId: requestId,
      authorId: currentUser.id,
      comment: newComment.text,
      createdAt: new Date().toISOString(),
      category: category,
    };

    const socketPayload = {
      requestId,
      authorId: currentUser.id,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      comment: newComment.text,
      category,
      createdAt: new Date().toISOString(),
      notificationMessage: notification,
    };

    socket.emit('comment', socketPayload);
    try {
      await axiosWithAuth().post('/comments', commentToPOST);

      //update comment for local state update
      commentToPOST['firstName'] = currentUser.firstName;
      commentToPOST['lastName'] = currentUser.lastName;
      commentToPOST['role'] = currentUser.role;
      //update local state so comment displays immediately
      setComments([...comments, commentToPOST]);

      if (currentUser.role === 'tenant') {
        await axiosWithAuth().put(`/requests/${requestId}`, {
          latestTenantActivity: new Date(),
        });
      } else if (
        currentUser.role === 'programManger' ||
        currentUser.role === 'admin'
      ) {
        await axiosWithAuth().put(`/requests/${requestId}`, {
          latestStaffActivity: new Date(),
        });
      }
      setNewComment({ text: '' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {filteredComments.length > 0 ? (
        filteredComments.map(comment => (
          <RenderComment key={comment.id} comm={comment} />
        ))
      ) : (
        <NoComment />
      )}
      <CreateComment newComment={newComment} setNewComment={setNewComment} />
      <Button
        type="primary"
        style={{ marginTop: '1%' }}
        disabled={checkCommentLength(newComment)}
        onClick={addComment}
      >
        Add Comment!
      </Button>
    </div>
  );
};

export default Comments;
