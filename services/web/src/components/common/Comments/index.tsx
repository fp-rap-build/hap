import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { axiosWithAuth } from '../../../api/axiosWithAuth';
import { checkCommentLength, getFormattedDate, fetchComments } from './utils';

import RenderComment from './components/RenderComment';
import CreateComment from './components/CreateComment';
import NoComment from './components/NoComment';

import { Button } from 'antd';
import socket from '../../../config/socket';

const Comments = ({ request, comments, setComments, category }) => {
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
      createdAt: getFormattedDate(),
      category: category,
    };

    const socketPayload = {
      requestId,
      authorId: currentUser.id,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      comment: newComment.text,
      category,
    };

    socket.emit('comment', socketPayload);
    try {
      await axiosWithAuth().post('/comments', commentToPOST);
      setNewComment({ text: '' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {filteredComments ? (
        filteredComments.map(comm => (
          <RenderComment key={comm.id} comm={comm} />
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
