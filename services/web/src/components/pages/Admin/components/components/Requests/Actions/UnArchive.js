import Unarchive from '@material-ui/icons/Unarchive';

import Container from './Container';

import { message } from 'antd';

import { axiosWithAuth } from '../../../../../../../api/axiosWithAuth';

export default function UnArchive({ setRequests, requestId }) {
  const unArchiveRequest = async () => {
    try {
      setRequests(requests =>
        requests.filter(request => {
          if (request.id !== requestId) return request;
        })
      );

      await axiosWithAuth().put(`/requests/${requestId}`, {
        archived: false,
      });

      message.success('Successfully unarchived request');
    } catch (error) {
      message.error('Unable to unarchive request');
    }
  };

  return (
    <Container onClick={unArchiveRequest}>
      <Unarchive />
    </Container>
  );
}
