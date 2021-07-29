import { formatUTC } from '../../../../utils/dates';

import { Comment } from 'antd';


const RenderComment = ({ comm }) => {
  const author = comm.firstName;

  return (
    <Comment
      author={author}
      datetime={formatUTC(comment.createdAt)}
      content={<p>{comment.comment}</p>}
    />
  );
};

export default RenderComment;
