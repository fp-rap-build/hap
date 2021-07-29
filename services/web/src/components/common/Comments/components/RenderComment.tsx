import { formatUTC } from '../../../../utils/dates';

import { Comment } from 'antd';

const RenderComment = ({ comm }) => {
  const author =
    comm.role === 'tenant' || comm.role === 'landlord'
      ? comm.firstName + ' ' + comm.lastName
      : comm.firstName;

  return (
    <Comment
      author={author}
      datetime={formatUTC(comm.createdAt)}
      content={<p>{comm.comment}</p>}
    />
  );
};

export default RenderComment;
