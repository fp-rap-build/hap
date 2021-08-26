import WarningFilled from '@material-ui/icons/Warning';
import { message } from 'antd';
import { axiosWithAuth } from '../../../../../../../api/axiosWithAuth';

import Container from './Container';

export default function MarkIncomplete({
  setRequests,
  requestId,
  hideRequest,
}) {
  const markIncomplete = async (event, rowData) => {
    try {
      if (hideRequest) {
        setRequests(requests =>
          requests.filter(request => {
            if (request.id !== requestId) return request;
          })
        );
      }

      await axiosWithAuth().put(`/requests/${requestId}`, {
        incomplete: true,
      });

      message.success('Successfully marked request incomplete');
    } catch (error) {
      message.error('Unable to mark request as incomplete');
    }
  };
  // Update the users request to be in revie

  return (
    <Container onClick={markIncomplete}>
      <WarningFilled />
    </Container>
  );
}
