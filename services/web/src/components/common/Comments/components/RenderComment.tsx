import { formatUTC } from '../../../../utils/dates';

import { Comment } from 'antd';

const RenderComment = ({ comm }) => {
  const author = comm.firstName + ' ' + comm.lastName;

  return (
    <Comment
      author={author}
      datetime={formatUTC(comm.createdAt)}
      content={<p>{comm.comment}</p>}
    />
  );
};

export default RenderComment;
