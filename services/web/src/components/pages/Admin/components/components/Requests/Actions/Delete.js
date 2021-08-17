import WarningFilled from '@material-ui/icons/Warning';
import { message, Modal } from 'antd';
import { axiosWithAuth } from '../../../../../../../api/axiosWithAuth';

import Container from './Container';

import DeleteIcon from '@material-ui/icons/Delete';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { useSelector } from 'react-redux';

export default function Delete({ setRequests, requestId }) {
  const { currentUser } = useSelector(state => state.user);

  const handleDelete = async () => {
    try {
      setRequests(requests =>
        requests.filter(request => {
          if (request.id !== requestId) return request;
        })
      );

      await axiosWithAuth().delete(`/requests/${requestId}`);

      message.success('Successfully deleted request');
    } catch (error) {
      message.error('Unable to delete request');
    }
  };

  const openConfirmDeleteModal = () =>
    Modal.confirm({
      title: 'Confirm deletion',
      icon: <ExclamationCircleOutlined />,
      content:
        'Are you sure you want to delete this request? All information attached to the request including documents, comments and payments will be deleted as well',
      okText: 'Delete',
      cancelText: 'Cancel',
      onOk: handleDelete,
    });

  return (
    <Container
      onClick={
        currentUser.role === 'admin'
          ? openConfirmDeleteModal
          : () => {
              return;
            }
      }
    >
      <DeleteIcon />
    </Container>
  );
}
