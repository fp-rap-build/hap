import DocumentUploader from '../DocumentUploader';

import { Modal, Button, Typography } from 'antd';
const { Title } = Typography;

const UploadDocModal = ({
  uploadModalVisibility,
  handleAcknowledge,
  handleCancel,
  selectedCategory,
  request,
  setDocumentStatuses,
  documentStatuses,
}) => {
  return (
    <>
      <Modal
        title={<Title level={5}>Upload Document</Title>}
        visible={uploadModalVisibility}
        onOk={handleAcknowledge}
        onCancel={handleCancel}
        bodyStyle={{ height: '20vh' }}
      >
        <DocumentUploader
          request={request}
          category={selectedCategory}
          setDocumentStatuses={setDocumentStatuses}
          documentStatuses={documentStatuses}
        />
      </Modal>
    </>
  );
};

export default UploadDocModal;
