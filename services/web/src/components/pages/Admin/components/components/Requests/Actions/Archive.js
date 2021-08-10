import ArchiveIcon from '@material-ui/icons/Archive';

import Container from './Container';

import { message } from 'antd';

import { axiosWithAuth } from '../../../../../../../api/axiosWithAuth';

export default function Archive({ setRequests, requestId }) {
  const archiveRequest = async () => {
    try {
      setRequests(requests =>
        requests.filter(request => {
          if (request.id !== requestId) return request;
        })
      );

      await axiosWithAuth().put(`/requests/${requestId}`, {
        archived: true,
      });

      message.success('Successfully archived request');
    } catch (error) {
      message.error('Unable to archive request');
    }
  };

  return (
    <Container onClick={archiveRequest}>
      <ArchiveIcon />
    </Container>
  );
}
