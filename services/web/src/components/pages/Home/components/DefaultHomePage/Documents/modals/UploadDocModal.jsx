import DocumentUploader from '../DocumentUploader';

import { Modal, Typography } from 'antd';
const { Title } = Typography;

const UploadDocModal = ({
  uploadModalVisibility,
  handleAcknowledge,
  handleCancel,
  selectedCategory,
  request,
  tableData,
  updateLocalStatuses,
}) => {
  return (
    <div className="uploadDocModal">
      <Modal
        title={<Title level={5}>Upload Document</Title>}
        askClosable={false}
        visible={uploadModalVisibility}
        onOk={handleAcknowledge}
        onCancel={handleCancel}
        bodyStyle={{ height: '30vh' }}
      >
        <DocumentUploader
          request={request}
          category={selectedCategory}
          tableData={tableData}
          updateLocalStatuses={updateLocalStatuses}
        />
      </Modal>
    </div>
  );
};

export default UploadDocModal;
