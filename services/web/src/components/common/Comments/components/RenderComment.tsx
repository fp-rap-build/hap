import { formatUTC } from '../../../../utils/dates';

import { Comment } from 'antd';

const RenderComment = ({ comment }) => {
  const author = comment.firstName + ' ' + comment.lastName;

  return (
    <Comment
      author={author}
      datetime={formatUTC(comment.createdAt)}
      content={<p>{comment.comment}</p>}
    />
  );
};

export default RenderComment;
