import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, message, Modal } from 'antd';
import { axiosWithAuth } from '../../../../../../../api/axiosWithAuth';

const { confirm } = Modal;
export default function DeleteDocument({
  document,
  setDocuments,
  setRequests,
  request,
  category,
}) {
  const deleteDocument = async () => {
    try {
      await axiosWithAuth().delete(`/documents/${document.docId}`);

      setRequests(prevState =>
        prevState.map(req => {
          if (req.id === request.id) {
            req[category] = req[category].filter(
              doc => doc.docId !== document.docId
            );
          }

          return req;
        })
      );

      setDocuments(prevState =>
        prevState.filter(doc => doc.id !== document.id)
      );
    } catch (error) {
      message.error('Unable to delete document');
    }
  };

  const confirmDelete = () => {
    return confirm({
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to delete this document?',
      onOk: deleteDocument,
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <p>Delete</p>
      <Button onClick={confirmDelete}>Delete</Button>
    </div>
  );
}
