import { Modal, Button } from 'antd';
import DocumentUploader from '../DocumentUploader';

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
        title="Basic Modal"
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
