import WarningFilled from '@material-ui/icons/Warning';
import { message } from 'antd';
import { axiosWithAuth } from '../../../../../../../api/axiosWithAuth';

import Container from './Container';

import CheckSquareFilled from '@material-ui/icons/CheckBoxOutlined';

export default function MarkComplete({ setRequests, requestId, hideRequest }) {
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
        incomplete: false,
      });

      message.success('Successfully marked request as complete');
    } catch (error) {
      message.error('Unable to mark request as complete');
    }
  };
  // Update the users request to be in revie

  return (
    <Container onClick={markIncomplete}>
      <CheckSquareFilled />
    </Container>
  );
}
