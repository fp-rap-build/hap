import { formatDate } from '../utils';

import { Comment } from 'antd';

const RenderComment = ({ comm }) => {
  const author = comm.firstName + ' ' + comm.lastName;

  return <Comment author={author} content={<p>{comm.comment}</p>} />;
};

export default RenderComment;
